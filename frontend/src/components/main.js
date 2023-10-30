
import React from 'react';

const Main = () => {
  const canvasRef = React.useRef(null);
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

  return (
    <div>
      <button onClick={() => fetchJuliaData(-1.5, 1.5, -1.5, 1.5, 0.45, 0.1428)}>Load Julia Set</button>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  )
}

export default Main;
