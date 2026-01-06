
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const messages = [
    "Initializing Core Systems...",
    "Loading Neural Networks...",
    "Booting Intelligence Modules...",
    "Synthesizing Experience...",
    "Compiling Visual Assets...",
    "System Ready."
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        // Small delay at 100% for aesthetic effect before switching
        setTimeout(onComplete, 800);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-xs md:max-w-md">
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col">
            <span className="text-indigo-500 font-orbitron text-[10px] tracking-widest uppercase mb-1">Booting Protocol</span>
            <div className="text-white font-orbitron text-sm md:text-lg font-bold h-8">
              {messages[textIndex]}
            </div>
          </div>
          <div className="text-indigo-400 font-orbitron text-2xl font-black">
            {Math.round(progress)}%
          </div>
        </div>

        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,1)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-8 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                backgroundColor: ["#4f46e5", "#818cf8", "#4f46e5"]
              }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 text-[10px] text-zinc-700 font-orbitron tracking-[0.3em] uppercase">
        Shivangi Sharma // Digital Environment // v1.0.4
      </div>
    </motion.div>
  );
};

export default Loader;
