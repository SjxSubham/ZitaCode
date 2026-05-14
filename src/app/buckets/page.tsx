"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FolderGit2, Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function BucketsPage() {
  const { isSignedIn, isLoaded } = useUser();
  const buckets = useQuery(api.buckets.getUserBuckets);
  const createBucket = useMutation(api.buckets.createBucket);

  const [newBucketName, setNewBucketName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!isLoaded) return <div className="min-h-screen bg-[#0a0a0f]" />;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center text-white">
        <FolderGit2 size={48} className="text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">My Buckets</h1>
        <p className="text-gray-400">Please sign in to view and manage your buckets.</p>
      </div>
    );
  }

  const handleCreateBucket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBucketName.trim()) return;
    try {
      setIsCreating(true);
      await createBucket({ name: newBucketName.trim() });
      setNewBucketName("");
      toast.success("Bucket created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create bucket");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                My Buckets
              </span>
            </div>
          </Link>

          <form onSubmit={handleCreateBucket} className="flex gap-2">
            <input
              type="text"
              placeholder="New bucket name..."
              className="bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
              value={newBucketName}
              onChange={(e) => setNewBucketName(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!newBucketName.trim() || isCreating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              <span className="hidden md:inline ml-2">Create</span>
            </Button>
          </form>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FolderGit2 className="text-blue-500" /> My Buckets
          </h1>
          <p className="text-gray-400 mb-8">
            Manage your saved snippets and collections.
          </p>

        {buckets === undefined ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        ) : buckets.length === 0 ? (
          <div className="text-center py-24 bg-[#1a1a2e] border border-white/10 rounded-2xl">
            <FolderGit2 size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-xl font-medium text-gray-300">You don't have any buckets yet.</p>
            <p className="text-gray-500 mt-2">Create one above to start saving snippets!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buckets.map((bucket) => (
              <Link
                key={bucket._id}
                href={`/buckets/${bucket._id}`}
                className="bg-[#1a1a2e] border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-[#1f1f38] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-200 mb-1 group-hover:text-blue-400 transition-colors">
                      {bucket.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Click to view saved snippets
                    </p>
                  </div>
                  <FolderGit2 className="text-blue-500/50 group-hover:text-blue-400" size={24} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
