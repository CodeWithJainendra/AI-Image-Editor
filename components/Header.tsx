
import React from 'react';
import { ElephantIcon } from './icons/ElephantIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <ElephantIcon className="h-8 w-8 text-[#0f4a8a]" />
          <h1 className="text-xl font-semibold text-gray-800">
            AI Image Editor
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
