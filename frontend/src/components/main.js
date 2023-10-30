import React, { useRef, useState } from 'react';

const Main = () => {
  const canvasRef = useRef(null);
  const minXRef = useRef(null);
  const maxXRef = useRef(null);
  const minYRef = useRef(null);
  const maxYRef = useRef(null);
  const compConstReRef = useRef(null);
  const compConstImRef = useRef(null);
  const width = 500;
  const height = 500;

  function fetchJuliaData(min_x, max_x, min_y, max_y, comp_const_re, comp_const_im) {
    fetch(`http://localhost:8000/api/julia/${min_x}/${max_x}/${min_y}/${max_y}/${comp_const_re}/${comp_const_im}/`)
      .then(response => response.json())
      .then(result => {
        drawJuliaSet(result.data);
      });
  }

  function getColor(iterations) {
    const max_iterations = 95
    if (iterations === max_iterations) {
      return 'rgb(0, 0, 0)'; // 黒色でフラクタルの外側を描画
    } else {
      const hue = 240 - (iterations * 240 / max_iterations);
      const saturation = 100;
      const lightness = 30 + (iterations / max_iterations) * 40;

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

  }

  function drawJuliaSet(data) {
    const ctx = canvasRef.current.getContext('2d');
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const iterations = data[y][x];
        const color = getColor(iterations);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  const handleSubmit = (event) => {
    console.log('hihi')
    event.preventDefault();
    const min_x = parseFloat(minXRef.current.value);
    const max_x = parseFloat(maxXRef.current.value);
    const min_y = parseFloat(minYRef.current.value);
    const max_y = parseFloat(maxYRef.current.value);
    const comp_const_re = parseFloat(compConstReRef.current.value);
    const comp_const_im = parseFloat(compConstImRef.current.value);
    fetchJuliaData(min_x, max_x, min_y, max_y, comp_const_re, comp_const_im);
  };

  return (
    <div>
      <div>
        <input type='number' ref={minXRef} placeholder='Min X' defaultValue='-1.5' />
        <input type='number' ref={maxXRef} placeholder='Max X' defaultValue='1.5' />
        <input type='number' ref={minYRef} placeholder='Min Y' defaultValue='-1.5' />
        <input type='number' ref={maxYRef} placeholder='Max Y' defaultValue='1.5' />
        <input type='number' step='0.01' ref={compConstReRef} placeholder='Real part of complex constant' defaultValue='0.45' />
        <input type='number' step='0.01' ref={compConstImRef} placeholder='Imaginary part of complex constant' defaultValue='0.1428' />
      </div>
      <button onClick={handleSubmit}>Load Julia Set</button>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
};

export default Main;
