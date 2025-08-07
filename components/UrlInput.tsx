
import React from 'react';

interface UrlInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="url-input" className="block text-sm font-medium text-gray-300 mb-2">
        הדבק כאן את הקישור מגוגל דרייב
      </label>
      <input
        id="url-input"
        type="text"
        dir="ltr"
        value={value}
        onChange={onChange}
        placeholder="https://drive.google.com/file/d/..."
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-100 placeholder-gray-500"
      />
    </div>
  );
};

export default UrlInput;
