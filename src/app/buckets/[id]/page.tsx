"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Code2, FolderGit2, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function BucketDetailPage() {
  const params = useParams();
  const bucketId = params.id as Id<"buckets">;
  const { isSignedIn, isLoaded } = useUser();

  const buckets = useQuery(api.buckets.getUserBuckets);
  const currentBucket = buckets?.find(b => b._id === bucketId);
  const snippets = useQuery(api.buckets.getSnippetsInBucket, { bucketId });
  const removeFromBucket = useMutation(api.buckets.removeSnippetFromBucket);

  const handleRemove = async (snippetId: Id<"snippets">) => {
    try {
      await removeFromBucket({ bucketId, snippetId });
      toast.success("Snippet removed from bucket");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove snippet");
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#0a0a0f]" />;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-white">
        <FolderGit2 size={48} className="text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
        <p className="text-gray-400">Please sign in to view this bucket.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center gap-4">
          <Link href="/buckets" className="text-gray-400 hover:text-white transition">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <FolderGit2 className="text-blue-500" size={28} />
              <h1 className="text-3xl font-bold">
                {currentBucket?.name || "Loading Bucket..."}
              </h1>
            </div>
          </div>
        </div>

        {snippets === undefined ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        ) : snippets.length === 0 ? (
          <div className="text-center py-24 bg-[#1a1a2e] border border-white/10 rounded-2xl">
            <Code2 size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-xl font-medium text-gray-300">This bucket is empty</p>
            <p className="text-gray-500 mt-2">Go to the community snippets to save some here!</p>
            <Link
              href="/snippets"
              className="mt-6 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Browse Snippets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <div key={snippet._id} className="relative group bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col">
                <Link href={`/snippets/${snippet._id}`} className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-mono">
                      {snippet.language}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {snippet.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {snippet.description || "No description"}
                  </p>
                </Link>
                <div className="px-6 py-4 bg-[#0d0d14] border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-500">By {snippet.userName}</span>
                  <button
                    onClick={() => handleRemove(snippet._id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Remove from bucket"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
