"use client";

import { deleteBlog } from "../actions/blog.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DialogModal from "./DialogModal";

export default function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteBlog(id);

    if (result.success) {
      router.push("/blogs");
      router.refresh();
    } else {
      alert(result.message);
      setLoading(false);
      setIsConfirmOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        disabled={loading}
        className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200 transition-all hover:bg-red-100 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      <DialogModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete this blog?"
      >
        <p className="text-text-secondary mb-8 leading-relaxed">
          Are you sure you want to delete this blog? This action cannot be
          undone, and the seed will be permanently removed from the forest.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsConfirmOpen(false)}
            disabled={loading}
            className="px-6 py-3 font-semibold text-text-primary bg-bg-secondary border border-border rounded-[12px] hover:bg-border transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 font-semibold text-white bg-red-600 rounded-[12px] hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Yes, Delete It"}
          </button>
        </div>
      </DialogModal>
    </>
  );
}
