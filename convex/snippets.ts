import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // `identity.subject` is the Clerk user ID usually mapped to `userId`
    const userId = identity.subject;
    const userName = identity.name ?? identity.nickname ?? identity.email?.split('@')[0] ?? "Unknown User";

    const snippetId = await ctx.db.insert("snippets", {
      userId,
      userName,
      title: args.title,
      description: args.description,
      language: args.language,
      code: args.code,
    });

    return snippetId;
  },
});

export const getSnippets = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

export const getSnippetById = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) {
      throw new Error("Snippet not found");
    }
    return snippet;
  },
});

export const deleteSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) {
      throw new Error("Snippet not found");
    }

    if (snippet.userId !== identity.subject) {
      throw new Error("Not authorized to delete this snippet");
    }

    // Optionally delete related comments and stars here, or rely on client-side filtering/cascade

    await ctx.db.delete(args.snippetId);
  },
});
