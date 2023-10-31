import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <div>{message}</div>;
};

export default ErrorMessage;
