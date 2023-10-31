import React, { useRef, useState } from 'react';

const Main = () => {
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const minXRef = useRef(null);
  const maxXRef = useRef(null);
  const minYRef = useRef(null);
  const maxYRef = useRef(null);
  const compConstRef = useRef(null);
  const width = 500;
  const height = 500;

  function fetchJuliaData(min_x, max_x, min_y, max_y, comp_const) {
    fetch(`http://localhost:8000/api/julia/${min_x}/${max_x}/${min_y}/${max_y}/${comp_const}/`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(errData.error || '予期せぬエラーが発生しました。');
          });
        }
        return response.json();
      })
      .then(result => {
        setError(null)
        drawJuliaSet(result.data);
      })
      .catch(error => {
        setError(error.message);
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
    event.preventDefault();
    const min_x = parseFloat(minXRef.current.value);
    const max_x = parseFloat(maxXRef.current.value);
    const min_y = parseFloat(minYRef.current.value);
    const max_y = parseFloat(maxYRef.current.value);
    const comp_const = compConstRef.current.value;
    console.log(comp_const)
    fetchJuliaData(min_x, max_x, min_y, max_y, comp_const);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            実数部最小値
            <input type='text' ref={minXRef} placeholder='min_x' defaultValue='-1.5' />
          </label>
          <label>
            実数部最大値
            <input type='text' ref={maxXRef} placeholder='max_x' defaultValue='1.5' />
          </label>
        </div>
        <div>
          <label>
            虚数部最小値
            <input type='text' ref={minYRef} placeholder='min_y' defaultValue='-1.5' />
          </label>
          <label>
            虚数部最大値
            <input type='text' ref={maxYRef} placeholder='max_y' defaultValue='1.5' />
          </label>
        </div>
        <div>
          <label>
            複素定数の実数部
            <input type='text' ref={compConstRef} placeholder='comp_const' defaultValue='0.45+0.1428j' />
          </label>
        </div>
        <input type="submit" value="描画" />
      </form>
      <div>{error}</div>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </>
  );
};

export default Main;
