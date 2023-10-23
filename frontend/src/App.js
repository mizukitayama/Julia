import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const canvasRef = React.useRef(null);
  const width = 500;
  const height = 500;

  function fetchJuliaData(min_x, max_x, min_y, max_y, comp_const_re, comp_const_im) {
    fetch(`http://localhost:8000/api/julia/${min_x}/${max_x}/${min_y}/${max_y}/${comp_const_re}/${comp_const_im}/`)
      .then(response => response.json())
      .then(result => {
        setData(result.data);
        drawJuliaSet(result.data);
      });
  }

  function drawJuliaSet(data) {
    const ctx = canvasRef.current.getContext('2d');
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const iterations = data[y][x];
        const colorValue = 255 - Math.floor((iterations / 64) * 255);
        ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  return (
    <div className="App">
      <button onClick={() => fetchJuliaData(-1.5, 1.5, -1.5, 1.5, -0.33, 0.64)}>Load Julia Set</button>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default App;
