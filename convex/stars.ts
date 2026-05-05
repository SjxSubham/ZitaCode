import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const toggleStar = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingStar = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id", (q) =>
        q.eq("userId", userId).eq("snippetId", args.snippetId)
      )
      .first();

    if (existingStar) {
      await ctx.db.delete(existingStar._id);
      return false; // Unstarred
    } else {
      await ctx.db.insert("stars", {
        userId,
        snippetId: args.snippetId,
      });
      return true; // Starred
    }
  },
});

export const getSnippetStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id", (q) => q.eq("snippetId", args.snippetId))
      .collect();

    return stars.length;
  },
});

export const hasUserStarredSnippet = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const userId = identity.subject;

    const existingStar = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id", (q) =>
        q.eq("userId", userId).eq("snippetId", args.snippetId)
      )
      .first();

    return !!existingStar;
  },
});
