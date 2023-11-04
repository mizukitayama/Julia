import React, { useState } from 'react';
import Form from './Form';
import Canvas from './Canvas';
import ErrorMessage from './ErrorMessage';
import '../App.css';

const Main: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<number[][] | null>(null);
  const width = 500;
  const height = 500;

  const fetchJuliaData = (min_x: number, max_x: number, min_y: number, max_y: number, comp_const: string) => {
    if (comp_const === '') {
      // 空欄の場合リクエストが通らないため、blankを送りエラーメッセージを受け取る
      comp_const = 'blank';
    }
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
        setError(null);
        setData(result.data);
      })
      .catch(error => {
        setError(error.message);
        setData(null);
      });
  }

  return (
    <>
      <div className='wrapper'>
        <div className='form'>
          <Form onSubmit={fetchJuliaData} />
          {error && <ErrorMessage message={error} />}
        </div>
        <div>
          {data && <Canvas data={data} width={width} height={height} />}
        </div>
      </div>
    </>
  );
};

export default Main;
