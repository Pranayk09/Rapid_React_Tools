import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRightLeft, Loader2, Languages } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
];

export default function Translator() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
          'Content-Type': 'application/json'
        },
        data: {
          q: sourceText,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        }
      };

      const response = await axios.request(options);
      
      if (response.data && response.data.data && response.data.data.translations) {
        setTranslatedText(response.data.data.translations[0].translatedText);
      } else {
        setTranslatedText('Translation not found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to translate text. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-2">
          <Languages className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">Translator</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Seamlessly translate your text across multiple languages with high precision.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        {/* Language Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-2/5">
            <label className="block text-sm font-medium text-slate-400 mb-2">Source Language</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwapLanguages}
            className="p-3 mt-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 shadow-lg group"
            title="Swap Languages"
          >
            <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <div className="w-full sm:w-2/5">
            <label className="block text-sm font-medium text-slate-400 mb-2">Target Language</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <textarea
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter text here..."
              className="input-field min-h-[200px] resize-none pb-12 transition-colors border-indigo-500/30 focus:border-indigo-500"
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-500">
              {sourceText.length} chars
            </div>
          </div>

          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="input-field min-h-[200px] resize-none bg-slate-900/80 cursor-default text-indigo-100 placeholder-slate-600 border-slate-700/50"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                  <span className="text-sm font-medium text-indigo-300 animate-pulse">Translating...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {error}
          </div>
        )}

        <div className="flex justify-center pt-2">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="btn-primary w-full sm:w-auto px-12 py-3 text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Translating
              </>
            ) : (
              'Translate Text'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
