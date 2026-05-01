import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function StringGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [randomString, setRandomString] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Using useCallback as requested to memoize the generation function
  const generateString = useCallback(() => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let generatedString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedString += charset[randomIndex];
    }
    setRandomString(generatedString);
    setIsCopied(false);
  }, [length, includeNumbers, includeSymbols]);

  // Using useEffect as requested to generate a string on initial load and when dependencies change
  useEffect(() => {
    generateString();
  }, [generateString]);

  const copyToClipboard = () => {
    if (!randomString) return;
    navigator.clipboard.writeText(randomString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500 delay-100">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-pink-500/10 rounded-2xl mb-2">
          <ShieldCheck className="w-8 h-8 text-pink-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          String <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Generator</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          Generate secure, random strings instantly for your passwords or tokens.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-8">
        
        {/* Output Display */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <input 
              type="text" 
              value={randomString} 
              readOnly 
              className="w-full bg-transparent text-xl sm:text-2xl font-mono text-center text-slate-100 py-6 px-4 outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className="absolute right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copy to clipboard"
            >
              {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
          
          {/* Length Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">Length</label>
              <span className="text-lg font-bold text-pink-400">{length}</span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="64" 
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6">
                <input 
                  type="checkbox" 
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(prev => !prev)}
                  className="peer appearance-none w-6 h-6 bg-slate-800 border-2 border-slate-600 rounded-md checked:bg-pink-500 checked:border-pink-500 transition-colors cursor-pointer"
                />
                <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors">Include Numbers</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6">
                <input 
                  type="checkbox" 
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(prev => !prev)}
                  className="peer appearance-none w-6 h-6 bg-slate-800 border-2 border-slate-600 rounded-md checked:bg-pink-500 checked:border-pink-500 transition-colors cursor-pointer"
                />
                <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors">Include Symbols</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button 
          onClick={generateString}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New String
        </button>

      </div>
    </div>
  );
}
