import React, { useState } from 'react';
import Form from './Form';
import Canvas from './Canvas';
import ErrorMessage from './ErrorMessage';

const Main = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
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
      <Form onSubmit={fetchJuliaData} />
      <ErrorMessage message={error} />
      <Canvas data={data} width={width} height={height} />
    </>
  );
};

export default Main;
