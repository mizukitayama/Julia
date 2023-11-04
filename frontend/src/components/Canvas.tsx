import React, { useRef, useEffect, useCallback } from 'react';

interface CanvasProps {
  data: number[][] | null;
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getColor = useCallback((iterations: number) => {
    const max_iterations = 95
    if (iterations === max_iterations) {
      return 'rgb(0, 0, 0)';
    } else {
      const hue = 240 - (iterations * 240 / max_iterations);
      const saturation = 100;
      const lightness = 30 + (iterations / max_iterations) * 40;

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }


  }, []);
  
  useEffect(() => {
    if (data) {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      if (!data) return;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const iterations = data[y][x];
          const color = getColor(iterations);
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [data, width, height, getColor]);


  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default Canvas;
