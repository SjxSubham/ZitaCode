"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, BrainCircuit, Loader2, Sparkles } from "lucide-react";
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

interface ApiError {
  error: string;
  errorType?: string;
}

export function AICodeReviewDialog({
  isOpen,
  onClose,
  code,
  language,
}: AICodeReviewDialogProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const handleReview = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const response = await fetch("/api/gemini/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          error: data.error || "Failed to get AI review",
          errorType: data.errorType,
        });
        return;
      }

      setSuggestions(data.suggestions);
    } catch (err) {
      console.error("Error getting AI review:", err);
      setError({
        error:
          "Network error. Please check your internet connection and try again.",
        errorType: "NETWORK_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorIcon = () => {
    return <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />;
  };

  const getErrorSuggestion = (errorType?: string) => {
    switch (errorType) {
      case "QUOTA_EXCEEDED":
        return (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">What you can do:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Wait for the quota to reset (usually resets daily)</li>
              <li>
                Check your usage at{" "}
                <a
                  href="https://ai.dev/rate-limit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ai.dev/rate-limit
                </a>
              </li>
              <li>
                Consider upgrading to a paid plan at{" "}
                <a
                  href="https://ai.google.dev/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ai.google.dev/pricing
                </a>
              </li>
            </ul>
          </div>
        );
      case "INVALID_API_KEY":
        return (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Please check that your GEMINI_API_KEY is correctly set in your
              environment variables.
            </p>
          </div>
        );
      case "RATE_LIMITED":
        return (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              You&apos;re making too many requests. Please wait a moment before
              trying again.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    setError(null);
    setSuggestions([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-fit max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg custom-scrollbar">
        <DialogHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 m-2 p-4 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 dark:text-gray-800">
            <BrainCircuit className="h-5 w-5" />
            AI Code Review
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-6">
          {error && !isLoading && (
            <div className="text-center py-6">
              {getErrorIcon()}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <p className="text-red-700 dark:text-red-400 font-medium">
                  {error.error}
                </p>
                {getErrorSuggestion(error.errorType)}
              </div>
              <Button
                onClick={handleReview}
                className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {suggestions.length === 0 && !isLoading && !error && (
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
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Analyzing your code...
              </p>
            </div>
          )}

          {suggestions.length > 0 && !error && (
            <div className="space-y-6 justify-between">
              <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">
                Suggestions:
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-4">
                <ReactMarkdown
                  components={{
                    code({
                      inline,
                      className,
                      children,
                      ...props
                    }: {
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                    }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="relative bg-gray-200 dark:bg-gray-800 p-3 rounded-lg shadow-inner">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                String(children).replace(/\n$/, ""),
                              );
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                            }}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded text-xs shadow-sm transition-all"
                          >
                            Copy
                          </button>

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
                              backgroundColor: "transparent",
                              padding: "0",
                              fontSize: "0.875rem",
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
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
                      return (
                        <div className="mb-2 pl-4 list-disc">{children}</div>
                      );
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
