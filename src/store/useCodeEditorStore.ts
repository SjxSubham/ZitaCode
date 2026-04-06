import { create } from "zustand";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";
import local from "next/font/local";
import { executionService } from "@/services/executionService";

const getInitialState = () => {
  //if we are on the sertver side
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 18,
      theme: "vs-dark",
    };
  }

  // If we are on the client side return values from local storage bcz localstorage is a browser API
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 18;
  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

const executionCache: Record<string, any> = {};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },
    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },
    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }
      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      // run code
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      const cacheKey = `${language}-${code}`;
      const cached = executionCache[cacheKey];
      if (cached) {
        set({
          output: cached.output,
          error: cached.error,
          executionResult: cached.executionResult,
          isRunning: false,
        });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const { output, error } = await executionService.executeCode({
          language,
          code,
        });

        if (error) {
          const errorState = {
            error,
            executionResult: {
              code,
              output: output || "",
              error,
            },
          };
          executionCache[cacheKey] = { ...errorState, output: "" };
          set(errorState);
          return;
        }

        const successState = {
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        };
        executionCache[cacheKey] = successState;
        set(successState);
      } catch (error) {
        console.log("error running code:", error);
        set({
          error: "Error running code",
          executionResult: {
            code,
            output: "",
            error: "Error running code",
          },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});
