"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  Code2,
  MessageSquare,
  Star,
  Share2,
  User,
} from "lucide-react";
import AddToBucketDialog from "@/app/(root)/_components/AddToBucketDialog";

export default function SnippetPage() {
  const params = useParams();
  const snippetId = params.id as Id<"snippets">;
  const { isSignedIn, user } = useUser();

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId });
  const comments = useQuery(api.snippetComments.getComments, { snippetId });
  const starsCount = useQuery(api.stars.getSnippetStarCount, { snippetId });
  const hasStarred = useQuery(api.stars.hasUserStarredSnippet, { snippetId });

  const addComment = useMutation(api.snippetComments.addComment);
  const toggleStar = useMutation(api.stars.toggleStar);

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStar = async () => {
    if (!isSignedIn) return;
    await toggleStar({ snippetId });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !commentText.trim()) return;

    try {
      setIsSubmitting(true);
      await addComment({
        snippetId,
        content: commentText.trim(),
      });
      setCommentText("");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (snippet === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#0a0a0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (snippet === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#0a0a0f] text-white">
        <Code2 size={48} className="text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Snippet Not Found</h1>
        <p className="text-gray-400 mb-6">
          The snippet you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/snippets"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Community
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 md:p-8 text-gray-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Link
            href="/snippets"
            className="text-gray-400 hover:text-white flex items-center gap-2 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Snippets</span>
          </Link>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-sm"
          >
            <Share2 size={16} />
            {copied ? "Link Copied!" : "Share"}
          </button>
        </div>

        {/* Snippet Header */}
        <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="text-blue-400" size={28} />
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {snippet.title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {snippet.userName}
                </span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs font-mono">
                  {snippet.language}
                </span>
              </div>
            </div>

            <button
              onClick={handleStar}
              disabled={!isSignedIn}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition border ${
                hasStarred
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <Star size={20} className={hasStarred ? "fill-yellow-500" : ""} />
              <span className="font-semibold">
                {starsCount !== undefined ? starsCount : "..."}
              </span>
            </button>
            {isSignedIn && <AddToBucketDialog snippetId={snippetId} />}
          </div>

          {snippet.description && (
            <p className="text-gray-300 mb-6 leading-relaxed">
              {snippet.description}
            </p>
          )}

          {/* Code Block */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-400 font-mono">
              <span>{snippet.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
              <code>{snippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6 text-xl font-semibold text-white">
            <MessageSquare size={24} className="text-blue-400" />
            <h2>Comments ({comments?.length || 0})</h2>
          </div>

          {isSignedIn ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-[#0d0d14] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-24"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !commentText.trim()}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center text-blue-400">
              Please sign in to join the discussion.
            </div>
          )}

          <div className="space-y-4">
            {comments === undefined ? (
              <div className="animate-pulse flex space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="rounded-full bg-white/10 h-10 w-10"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-white/10 rounded w-1/4"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 bg-white/5 border border-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-200">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(comment._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 ml-10 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
