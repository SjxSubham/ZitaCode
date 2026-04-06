// src/app/(root)/_components/ServiceWorkerInitializer.tsx
"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ServiceWorkerInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      let refreshing = false;

      // Listen for the controlling service worker changing
      // and reload the page to make sure everything is using the new cache.
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);

          // Listen for new service worker installation
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;

            newWorker.addEventListener("statechange", () => {
              // If a new service worker is installed and ready to take over
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // Prompt the user to update
                toast(
                  (t) => (
                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        A new version of ZitaCode is available!
                      </span>
                      <div className="flex gap-2 justify-end">
                        <button
                          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded text-sm hover:opacity-80 transition"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          Dismiss
                        </button>
                        <button
                          className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-purple-700 transition"
                          onClick={() => {
                            // Tell the new service worker to take over immediately
                            newWorker.postMessage({ type: "SKIP_WAITING" });
                            toast.dismiss(t.id);
                          }}
                        >
                          Update Now
                        </button>
                      </div>
                    </div>
                  ),
                  { duration: Infinity, position: "bottom-right" },
                );
              }
            });
          });
        })
        .catch((err) => console.log("SW registration failed:", err));
    }
  }, []);

  return null;
}
