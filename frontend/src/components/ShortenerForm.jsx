import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, ArrowRight, Loader2 } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const ShortenerForm = ({ onShorten }) => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!url) {
            setError('Please enter a URL');
            return;
        }

        try {
            new URL(url);
        } catch {
            setError('Please enter a valid URL (e.g., https://example.com)');
            return;
        }

        setIsLoading(true);

        try {
            await onShorten(url);
            setUrl('');
        } catch (err) {
            setError(err.message || 'Failed to shorten URL');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl px-6 py-8 md:p-10 mx-auto"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white flex justify-center items-center gap-2">
                    Make your
                    <span className="text-blue-500">
                        <Typewriter
                            options={{
                                strings: ['urls', 'links', 'routing'],
                                autoStart: true,
                                loop: true,
                                delay: 75,
                                deleteSpeed: 50,
                            }}
                        />
                    </span>
                    <br className="md:hidden" /> readable.
                </h2>
                <p className="text-gray-400 text-lg">Create clean, recognizable links in seconds.</p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Link2 size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Paste your long URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                        className={`w-full pl-11 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-inner
              ${error ? 'focus:ring-red-500 border-red-500/50' : 'focus:ring-blue-500'}`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all glow-blue disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <>Shorten <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-red-400 text-sm px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ShortenerForm;
