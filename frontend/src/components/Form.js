import React, { useRef } from 'react';

const Form = ({ onSubmit }) => {
  const minXRef = useRef(null);
  const maxXRef = useRef(null);
  const minYRef = useRef(null);
  const maxYRef = useRef(null);
  const compConstRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const min_x = parseFloat(minXRef.current.value);
    const max_x = parseFloat(maxXRef.current.value);
    const min_y = parseFloat(minYRef.current.value);
    const max_y = parseFloat(maxYRef.current.value);
    const comp_const = compConstRef.current.value;
    onSubmit(min_x, max_x, min_y, max_y, comp_const);
  };

  return (
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
  );
};

export default Form;
