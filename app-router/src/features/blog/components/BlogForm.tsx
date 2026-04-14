"use client";

import { BlogInput } from "../validation/blog.zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { APIResponse } from "@/types/api";
import { Blog } from "@prisma/client";

interface BlogFormProps {
  initialData?: {
    title?: string;
    content?: string;
    image?: string | null;
  };
  action: (input: BlogInput) => Promise<APIResponse<Blog>>;
  submitLabel: string;
  onSuccess?: () => void;
}

export default function BlogForm({
  initialData,
  action,
  submitLabel,
  onSuccess,
}: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;

    const result = await action({ title, content, image });

    if (result.success && result.data) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/blogs/${result.data.id}`);
        router.refresh();
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-4 rounded-xl text-[0.95rem] font-medium flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-[0.95rem] font-semibold text-text-primary mb-2">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={initialData?.title}
          disabled={loading}
          placeholder="Enter an engaging title..."
          className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-[1rem] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-[0.95rem] font-semibold text-text-primary mb-2">
          Cover Image URL <span className="text-text-muted font-normal text-[0.85rem]">(Optional)</span>
        </label>
        <input
          type="url"
          id="image"
          name="image"
          defaultValue={initialData?.image || ""}
          disabled={loading}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-[1rem] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-[0.95rem] font-semibold text-text-primary mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={8}
          defaultValue={initialData?.content}
          disabled={loading}
          placeholder="Share your thoughts with the world..."
          className="w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-[1rem] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 mt-2 bg-accent text-white font-bold text-[1.1rem] rounded-xl hover:bg-accent-hover hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "Planting seed..." : submitLabel}
      </button>
    </form>
  );
}
