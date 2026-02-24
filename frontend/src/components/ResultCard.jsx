import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, CheckCircle2 } from 'lucide-react';

const ResultCard = ({ result }) => {
    const [copied, setCopied] = useState(false);

    if (!result) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl px-6 py-8 md:p-10 mx-auto mt-8 glass-panel rounded-2xl border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mb-3 border border-blue-500/20">
                    <CheckCircle2 size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-white tracking-tight">Success!</h3>
                <p className="text-gray-400 text-sm">Your long URL is now compact and ready to share.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0B1120] border border-blue-500/30 p-4 sm:px-5 rounded-xl mb-4 gap-4 shadow-inner">
                <span className="font-semibold text-blue-400 text-lg break-all mr-0 sm:mr-4">
                    {result.shortUrl}
                </span>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={handleCopy}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${copied
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30'
                            }`}
                        title="Copy to clipboard"
                    >
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>

                    <a
                        href={result.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                        title="Open in new tab"
                    >
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-black/40 px-4 py-3 rounded-lg text-sm text-gray-400 border border-white/5">
                <span className="font-medium opacity-70 shrink-0">Original:</span>
                <span className="truncate flex-1" title={result.originalUrl}>
                    {result.originalUrl}
                </span>
            </div>
        </motion.div>
    );
};

export default ResultCard;
