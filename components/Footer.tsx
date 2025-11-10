
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} AI Image Editor. All rights reserved.</p>
        <p className="text-xs text-gray-400 mt-1">Powered by Gemini</p>
      </div>
    </footer>
  );
};

export default Footer;
