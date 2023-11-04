import React, { useRef, FC, FormEvent } from 'react';
import '../App.css';

interface onSubmitProps {
  onSubmit: (min_x: number, max_x: number, min_y: number, max_y: number, comp_const: string) => void;
}

const Form: React.FC<onSubmitProps> = ({ onSubmit }) => {
  const minXRef = useRef<HTMLInputElement>(null);
  const maxXRef = useRef<HTMLInputElement>(null);
  const minYRef = useRef<HTMLInputElement>(null);
  const maxYRef = useRef<HTMLInputElement>(null);
  const compConstRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const min_x = parseFloat(minXRef.current!.value);
    const max_x = parseFloat(maxXRef.current!.value);
    const min_y = parseFloat(minYRef.current!.value);
    const max_y = parseFloat(maxYRef.current!.value);
    const comp_const = compConstRef.current!.value;
    onSubmit(min_x, max_x, min_y, max_y, comp_const);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-unit'>
        <div>
          <label className='input'>
            <div>
              実数部最小値
            </div>
            <input type='text' ref={minXRef} placeholder='min_x' defaultValue='-1.5' />
          </label>
        </div>
        <div>
          <label className='input'>
            <div>
              実数部最大値
            </div>
            <input type='text' ref={maxXRef} placeholder='max_x' defaultValue='1.5' />
          </label>
        </div>
      </div>

      <div className='input-unit'>
        <div>
          <label className='input'>
            <div>
              虚数部最小値
            </div>
            <input type='text' ref={minYRef} placeholder='min_y' defaultValue='-1.5' />
          </label>
        </div>
        <div>
          <label className='input'>
            <div>
              虚数部最大値
            </div>
            <input type='text' ref={maxYRef} placeholder='max_y' defaultValue='1.5' />
          </label>
        </div>
      </div>

      <div className='input-unit'>
        <div>
          <label className='input'>
            <div>
              複素定数の実数部
            </div>
            <input type='text' ref={compConstRef} placeholder='comp_const' defaultValue='0.45+0.1428j' />
          </label>
        </div>
      </div>
      <input type="submit" value="描画" />
    </form>
  );
};

export default Form;
