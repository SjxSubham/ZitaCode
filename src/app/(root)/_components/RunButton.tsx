"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";

function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();

  const handleRun = useCallback(async () => {
    await runCode();
  }, [runCode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isRunning) {
          handleRun();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, handleRun]);

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
      group relative inline-flex items-center gap-2.5 px-5 py-2.5
      disabled:cursor-not-allowed
      focus:outline-none shadow-xl
    `}
      aria-label="Run code (Ctrl+Enter)"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white/70" />
            <div className="absolute inset-0 blur animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Executing...
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}

export default RunButton;
