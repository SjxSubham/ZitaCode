"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPanel = () => {
  const { output, error, isRunning, userInput, setUserInput } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'input'>('output');

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }
  return (
    <div className="relative shadow-2xl bg-gray-400/50 dark:bg-[#181825] rounded-xl p-7 ring-1 ring-gray-100 dark:ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'output' ? 'bg-gray-200 dark:bg-[#1e1e2e] text-blue-600 dark:text-blue-400 ring-1 ring-gray-300 dark:ring-gray-700' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-[#1e1e2e]/50'}`}
          >
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-medium">Output</span>
          </button>

          <button
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'input' ? 'bg-gray-200 dark:bg-[#1e1e2e] text-blue-600 dark:text-blue-400 ring-1 ring-gray-300 dark:ring-gray-700' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-[#1e1e2e]/50'}`}
          >
            <Terminal className="w-4 h-4 rotate-180" /> {/* Reusing Terminal icon effectively */}
            <span className="text-sm font-medium">Input (Custom)</span>
          </button>
        </div>


        {hasContent && activeTab === 'output' && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-300 dark:bg-[#1e1e2e] 
          rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#50eaed]" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        {activeTab === 'output' ? (
          <div
            className="relative bg-[#f5f5f5]/90 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
           rounded-lg p-4 h-[600px] overflow-auto font-mono text-sm"
          >
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium animate-pulse">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/50 dark:text-red-400/80">{error}</pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600 dark:text-emerald-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Execution Successful...</span>
                </div>
                <pre className="whitespace-pre-wrap text-[#1e1e2e]/100 dark:text-gray-300">{output}</pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center  justify-center w-12 h-12 rounded-full bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-center">Run your code to see the output here...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-[#f5f5f5]/90 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
                rounded-lg p-4 h-[600px] overflow-hidden font-mono text-sm">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your input here... (stdin)"
              className="w-full h-full bg-transparent border-none outline-none resize-none text-[#1e1e2e] dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-600 p-2"
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default OutputPanel;