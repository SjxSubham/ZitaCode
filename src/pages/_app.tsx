// src/pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('SW registered:', registration.scope))
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;