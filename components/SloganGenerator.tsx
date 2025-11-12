import React, { useState, useCallback } from 'react';
import { generateSlogans } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

const SloganGenerator: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      setError('Please provide a description of your organization.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const newSlogans = await generateSlogans(description);
      setSlogans(newSlogans);
      setShowResults(true);
    } catch (err) {
      setError('Failed to generate slogans. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [description]);

  const handleStartOver = () => {
    setDescription('');
    setSlogans([]);
    setError(null);
    setShowResults(false);
    setIsLoading(false);
  };

  if (showResults) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-300 animate-fade-in">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Your Description</h3>
          <p className="text-slate-300 mt-1 p-4 bg-slate-900/50 border border-slate-700 rounded-md">{description}</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">Generated Slogans</h2>
        <ul className="space-y-3">
          {slogans.map((slogan, index) => (
            <li
              key={index}
              className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-lg transition-transform duration-300 hover:scale-105 hover:border-cyan-500"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
            >
              "{slogan}"
            </li>
          ))}
        </ul>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? <LoadingSpinner /> : <RefreshIcon />}
            <span>{isLoading ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
          <button
            onClick={handleStartOver}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 disabled:opacity-50 transition-colors"
          >
            <ArrowLeftIcon />
            <span>Start Over</span>
          </button>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-1 text-slate-100">Describe Your Organization</h2>
      <p className="text-slate-400 mb-6">Provide a brief description to generate your unique slogans.</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g., A non-profit that provides solar-powered lamps to rural communities without electricity."
        className="w-full h-32 p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
        disabled={isLoading}
      />
      {error && <p className="text-red-400 mt-4">{error}</p>}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !description.trim()}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? <LoadingSpinner /> : <SparklesIcon />}
        <span>{isLoading ? 'Generating...' : 'Generate Slogans'}</span>
      </button>
    </div>
  );
};

export default SloganGenerator;