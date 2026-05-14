"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AddToBucketDialog({ snippetId }: { snippetId: Id<"snippets"> }) {
  const buckets = useQuery(api.buckets.getUserBuckets) || [];
  const createBucket = useMutation(api.buckets.createBucket);
  const addSnippetToBucket = useMutation(api.buckets.addSnippetToBucket);

  const [isOpen, setIsOpen] = useState(false);
  const [newBucketName, setNewBucketName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isAdding, setIsAdding] = useState<Id<"buckets"> | null>(null);

  const handleCreateBucket = async () => {
    if (!newBucketName.trim()) return;
    try {
      setIsCreating(true);
      await createBucket({ name: newBucketName.trim() });
      setNewBucketName("");
      toast.success("Bucket created!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create bucket");
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddToBucket = async (bucketId: Id<"buckets">) => {
    try {
      setIsAdding(bucketId);
      await addSnippetToBucket({ bucketId, snippetId });
      toast.success("Added to bucket!");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Could not add to bucket");
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 rounded-xl transition">
          <BookmarkPlus size={20} />
          <span className="font-semibold text-sm">Save</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a2e] border border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Save to Bucket</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New bucket name..."
              className="flex-1 bg-[#0d0d14] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              value={newBucketName}
              onChange={(e) => setNewBucketName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateBucket()}
            />
            <Button
              onClick={handleCreateBucket}
              disabled={!newBucketName.trim() || isCreating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            </Button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {buckets.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No buckets yet. Create one above!</p>
            ) : (
              buckets.map((bucket) => (
                <div key={bucket._id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition">
                  <span className="font-medium text-sm text-gray-200">{bucket.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-white/10 hover:bg-white/20 text-gray-800"
                    disabled={isAdding === bucket._id}
                    onClick={() => handleAddToBucket(bucket._id)}
                  >
                    {isAdding === bucket._id ? <Loader2 size={14} className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
