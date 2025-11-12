
import React from 'react';
import SloganGenerator from './components/SloganGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          AI Slogan Generator
        </h1>
        <p className="mt-2 text-slate-400">Craft the perfect tagline for your brand</p>
      </header>
      <main className="w-full max-w-2xl">
        <SloganGenerator />
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
