
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons.tsx';

interface ResultDisplayProps {
  url: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="result-output" className="block text-sm font-medium text-gray-300 mb-2">
        קישור להורדה ישירה
      </label>
      <div className="relative flex items-center">
        <input
          id="result-output"
          type="text"
          dir="ltr"
          value={url}
          readOnly
          placeholder="הקישור שנוצר יופיע כאן..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-400 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleCopy}
          disabled={!url}
          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-400 hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent transition-all duration-200"
          aria-label="העתק קישור"
        >
          {isCopied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <ClipboardIcon className="h-5 w-5" />}
        </button>
      </div>
      {isCopied && (
         <p className="text-green-500 text-sm mt-2 text-center animate-pulse">הועתק ללוח!</p>
      )}
    </div>
  );
};

export default ResultDisplay;
