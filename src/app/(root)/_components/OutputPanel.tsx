"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Terminal,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning, userInput, setUserInput } =
    useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative shadow-2xl bg-gray-400/50 dark:bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e]
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05] bg-[#1e1e2e]/50 flex flex-col h-[600px]">
        <div className="flex-1 p-4 overflow-auto font-mono text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {isRunning ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running code...</span>
              </div>
              <RunningCodeSkeleton />
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 italic text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-full bg-gray-800/50">
                  <Terminal className="w-5 h-5 text-gray-600" />
                </div>
                <span>Run your code to see the output here...</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-white/[0.05]" />

        <div className="p-4 bg-[#1e1e2e]">
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <Terminal className="w-3 h-3" />
            Input (Stdin)
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your input here..."
            className="w-full h-24 bg-transparent border-none outline-none resize-none text-gray-300 placeholder-gray-600 font-mono text-sm p-0 focus:ring-0"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
