
import React from 'react';
import { BotIcon } from './IconComponents';

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64 animate-fade-in">
      <BotIcon className="h-16 w-16 text-sky-400 animate-pulse mb-6" />
      <div className="text-lg font-semibold text-gray-300">Processing...</div>
      <p className="mt-2 text-sm max-w-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
