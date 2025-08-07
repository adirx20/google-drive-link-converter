
import React from 'react';
import { MediaType } from '../types.ts';

interface MediaTypeSelectorProps {
  selectedType: MediaType;
  onChange: (type: MediaType) => void;
}

const MediaTypeSelector: React.FC<MediaTypeSelectorProps> = ({ selectedType, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        בחר את סוג הקובץ
      </label>
      <div className="flex space-x-4 space-x-reverse">
        <button
          onClick={() => onChange(MediaType.IMAGE)}
          className={`flex-1 py-3 px-4 rounded-lg text-center font-semibold transition-all duration-200 ${
            selectedType === MediaType.IMAGE
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          תמונה (PNG)
        </button>
        <button
          onClick={() => onChange(MediaType.VIDEO)}
          className={`flex-1 py-3 px-4 rounded-lg text-center font-semibold transition-all duration-200 ${
            selectedType === MediaType.VIDEO
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          וידאו (MP4)
        </button>
      </div>
    </div>
  );
};

export default MediaTypeSelector;
