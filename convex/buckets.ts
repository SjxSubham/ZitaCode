import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 1. Create a new bucket
export const createBucket = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    return await ctx.db.insert("buckets", {
      userId,
      name: args.name,
      description: args.description,
    });
  },
});

// 2. Get all buckets for the logged-in user
export const getUserBuckets = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("buckets")
      .withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// 3. Add a snippet to a bucket
export const addSnippetToBucket = mutation({
  args: {
    bucketId: v.id("buckets"),
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify the user owns the bucket
    const bucket = await ctx.db.get(args.bucketId);
    if (!bucket || bucket.userId !== identity.subject) {
      throw new Error("Bucket not found or unauthorized");
    }

    // Check if the snippet is already in the bucket
    const existing = await ctx.db
      .query("bucketSnippets")
      .withIndex("by_bucket_and_snippet", (q) =>
        q.eq("bucketId", args.bucketId).eq("snippetId", args.snippetId)
      )
      .first();

    if (existing) {
      throw new Error("Snippet is already in this bucket");
    }

    return await ctx.db.insert("bucketSnippets", {
      bucketId: args.bucketId,
      snippetId: args.snippetId,
    });
  },
});

// 4. Remove a snippet from a bucket
export const removeSnippetFromBucket = mutation({
  args: {
    bucketId: v.id("buckets"),
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify the user owns the bucket
    const bucket = await ctx.db.get(args.bucketId);
    if (!bucket || bucket.userId !== identity.subject) {
      throw new Error("Bucket not found or unauthorized");
    }

    const existing = await ctx.db
      .query("bucketSnippets")
      .withIndex("by_bucket_and_snippet", (q) =>
        q.eq("bucketId", args.bucketId).eq("snippetId", args.snippetId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

// 5. Get all snippets inside a specific bucket
export const getSnippetsInBucket = query({
  args: { bucketId: v.id("buckets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const bucket = await ctx.db.get(args.bucketId);
    if (!bucket || bucket.userId !== identity.subject) {
      return []; // Only the owner can see the snippets in their bucket for now
    }

    const bucketSnippets = await ctx.db
      .query("bucketSnippets")
      .withIndex("by_bucket_id", (q) => q.eq("bucketId", args.bucketId))
      .collect();

    const snippets = [];
    for (const bs of bucketSnippets) {
      const snippet = await ctx.db.get(bs.snippetId);
      if (snippet) snippets.push(snippet);
    }

    return snippets;
  },
});
