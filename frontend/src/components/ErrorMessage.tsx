import React from 'react';
import '../App.css';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <div className='error-message'>{message}</div>;
};

export default ErrorMessage;
