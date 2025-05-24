"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Copy, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AICodeReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
}

export function AICodeReviewDialog({ isOpen, onClose, code, language }: AICodeReviewDialogProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleReview = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to get AI review");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error getting AI review:", error);
    } finally {
      setIsLoading(false);
    }
  };

 
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-fit sm:justify-between max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg custom-scrollbar">
        <DialogHeader className="bg-gradient-to-r  from-yellow-400 to-yellow-500 m-2 p-4 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 dark:text-gray-800">
            <BrainCircuit className="h-5 w-5" />
            AI Code Review
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-6">
          {suggestions.length === 0 && !isLoading && (
            <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Get AI-powered suggestions for your code
                </p>
              <Button
                onClick={handleReview}
                className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                <BrainCircuit className="text-gray-800 h-4 w-4" />
                Review Code
              </Button>

            </div>

            
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">
                Suggestions:
              </h3>
              <div
                className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="relative bg-gray-200 dark:bg-gray-800 p-3 rounded-lg shadow-inner">
                          {/* Copy Button */}

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
                              setIsCopied(true); // Show tooltip
                              setTimeout(() => setIsCopied(false), 2000); // Hide tooltip after 2 seconds
                            }}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded text-xs shadow-sm transition-all"
                          >
                            Copy
                          </button>

                          {/* Tooltip */}
                          {isCopied && (
                            <div className="absolute top-10 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-md">
                              Code Copied!
                            </div>
                          )}
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              backgroundColor: 'transparent',
                              padding: '0',
                              fontSize: '0.875rem',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className={`${className} bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <div className="mb-4">{children}</div>;
                    },
                    li({ children }) {
                      return <div className="mb-2 pl-4 list-disc">{children}</div>;
                    },
                  }}
                >
                  {suggestions.join("\n\n")}
                </ReactMarkdown>
              </div>
                <Button
                  onClick={handleReview}
                  variant="outline"
                  className="w-full gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Review Again
                </Button>
              </div>
            
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}