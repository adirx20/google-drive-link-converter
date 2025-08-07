import React from 'react';
import ReactDOM from 'react-dom/client';

// From types.ts
enum MediaType {
  IMAGE = 'png',
  VIDEO = 'mp4',
}

// From components/icons.tsx
const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


// From components/UrlInput.tsx
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


// From components/MediaTypeSelector.tsx
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

// From components/ResultDisplay.tsx
interface ResultDisplayProps {
  url: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ url }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
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


// From App.tsx
const App: React.FC = () => {
  const [inputUrl, setInputUrl] = React.useState('');
  const [outputUrl, setOutputUrl] = React.useState('');
  const [mediaType, setMediaType] = React.useState<MediaType>(MediaType.IMAGE);

  React.useEffect(() => {
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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);