// src/components/InstallButton.tsx
"use client";
import { motion } from 'framer-motion';
import { WandSparkles } from 'lucide-react';
import usePWAInstall from '../../../hooks/usePWAInstall';

export default function InstallButton() {
  const { installPrompt, install } = usePWAInstall();

  if (!installPrompt) return null;

  return (
    <motion.button
      onClick={install}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg"
    >
      <WandSparkles size={16} />
      Install App
    </motion.button>
  );
}