import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addComment = mutation({
  args: {
    snippetId: v.id("snippets"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const userName = identity.name ?? identity.nickname ?? identity.email?.split('@')[0] ?? "Unknown User";

    const commentId = await ctx.db.insert("snippetComments", {
      snippetId: args.snippetId,
      userId,
      userName,
      content: args.content,
    });

    return commentId;
  },
});

export const getComments = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id", (q) => q.eq("snippetId", args.snippetId))
      .collect();

    return comments;
  },
});

export const deleteComment = mutation({
  args: { commentId: v.id("snippetComments") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.userId !== identity.subject) {
      throw new Error("Not authorized to delete this comment");
    }

    await ctx.db.delete(args.commentId);
  },
});
