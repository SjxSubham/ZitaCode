// src/app/(root)/_components/ServiceWorkerInitializer.tsx
"use client";

import { useEffect } from 'react';

export default function ServiceWorkerInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg))
        .catch(err => console.log('SW registration failed:', err));
    }
  }, []);

  return null;
}