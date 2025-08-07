
import React, { useState, useEffect } from 'react';
import { MediaType } from './types.ts';
import UrlInput from './components/UrlInput.tsx';
import MediaTypeSelector from './components/MediaTypeSelector.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';

const App: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.IMAGE);

  useEffect(() => {
    const convertUrl = () => {
      if (!inputUrl) {
        setOutputUrl('');
        return;
      }
      
      const fileIdRegex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = inputUrl.match(fileIdRegex);

      if (match && match[1]) {
        const fileId = match[1];
        const newUrl = `https://drive.google.com/uc?export=download&id=${fileId}&media_type=${mediaType}`;
        setOutputUrl(newUrl);
      } else {
        setOutputUrl('');
      }
    };

    convertUrl();
  }, [inputUrl, mediaType]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-700 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            ממיר קישורי גוגל דרייב
          </h1>
          <p className="text-gray-400 mt-2">
            הפוך קישורי צפייה לקישורי הורדה ישירה בקליק אחד.
          </p>
        </div>
        
        <div className="space-y-6">
          <UrlInput value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
          <MediaTypeSelector selectedType={mediaType} onChange={setMediaType} />
          <div className="border-t border-gray-700 my-6"></div>
          <ResultDisplay url={outputUrl} />
        </div>

        <footer className="text-center mt-8 text-xs text-gray-500">
            <p>הכלי אינו שומר מידע. כל הפעולות מתבצעות בדפדפן שלך.</p>
        </footer>
      </div>
    </main>
  );
};

export default App;
