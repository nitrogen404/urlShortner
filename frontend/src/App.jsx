import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShortenerForm from './components/ShortenerForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);

  const handleShorten = async (url) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setResult(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-black">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <motion.div
        className="w-full max-w-3xl flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-4 text-white">
              URL<span className="text-blue-500">Short</span>
            </h1>
          </motion.div>
        </div>

        <ShortenerForm onShorten={handleShorten} />

        <AnimatePresence>
          {result && (
            <ResultCard key="result" result={result} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
