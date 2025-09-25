
import React from 'react';
import { LeafIcon, RefreshCwIcon } from './IconComponents';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-8 w-8 text-green-400" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-sky-400">
            Agri-Genius 2040
          </h1>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center space-x-2 bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 font-semibold py-2 px-4 border border-sky-500/30 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCwIcon className="h-4 w-4" />
            <span>New Plan</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
