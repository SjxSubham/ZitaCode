<<<<<<< HEAD
"use client";

import Link from "next/link";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Code2, MessageSquare, Star } from "lucide-react";

function Page() {
  const snippets = useQuery(api.snippets.getSnippets);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div
              className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0
                group-hover:opacity-100 transition-all duration-500 blur-xl"
            />
            <div
              className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all"
            >
              <div className="size-8 text-blue-400 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="/Image...webp"
                  alt="ZitaCode"
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                ZitaCode
              </span>
              <span className="block text-xs text-blue-400/60 font-medium">
                Snippets Community
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create Snippet
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">
            Community Snippets
          </h1>
          <p className="text-gray-400 mb-8">
            Discover and share code with the community.
          </p>

          {snippets === undefined ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : snippets.length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a2e] rounded-xl border border-white/10 text-gray-400">
              No snippets shared yet. Be the first to share!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snippets.map((snippet) => (
                <Link href={`/snippets/${snippet._id}`} key={snippet._id}>
                  <div className="bg-[#1a1a2e] hover:bg-[#1f1f35] transition-colors border border-white/10 rounded-xl p-5 h-full flex flex-col cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <Code2 size={20} className="text-blue-400" />
                      <h2 className="text-lg font-semibold text-gray-200 line-clamp-1">
                        {snippet.title}
                      </h2>
                    </div>
                    {snippet.description && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">
                        {snippet.description}
                      </p>
                    )}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 text-xs text-gray-500">
                        <span className="bg-white/5 px-2 py-1 rounded-md">
                          {snippet.language}
                        </span>
                        <span>by {snippet.userName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
=======
import { Settings, Wrench } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function Page() {
  return (
    <div className="min-h-screen p-8">
    <div className="max-w-4xl mx-auto space-y-8">
    <Link href="/" className="flex items-center gap-3 group relative">
  
  <div
    className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
      group-hover:opacity-100 transition-all duration-500 blur-xl"
  />

  
  <div
    className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
    ring-white/10 group-hover:ring-white/20 transition-all"
  >
    <div className="size-8 text-blue-400 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" >
      <img
    src="/Image...webp"
    alt="ZitaCode"
    className='rounded-md'
    
  />
        </div>
          </div>

  <div className="flex flex-col">
    <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
      ZitaCode
    </span>
    <span className="block text-xs text-blue-400/60 font-medium">
      Online Code Editor
    </span>
  </div>
</Link>
    <div className='dark:bg-gray-500 bg-gray-300 rounded-2xl shadow-2xl'>
     <div className='flex flex-row gap-2 md:gap-4 sm:gap-2 font-extrabold text-3xl justify-center text-center p-9 '><Wrench size={36} absoluteStrokeWidth />This page is under maintainence <Settings className='animate-spin ' size={30} strokeWidth={1.75} absoluteStrokeWidth /></div>
    </div>
    </div>
    </div>
  )
}
export default Page;
>>>>>>> ed15fc3 (rebasing)
