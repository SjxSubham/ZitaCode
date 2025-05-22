// src/types/global.d.ts
interface Window {
    workbox?: {
      register: () => Promise<void>;
    };
  }