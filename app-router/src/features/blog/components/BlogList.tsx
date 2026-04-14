"use client";

import BlogCard from "./BlogCard";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DialogModal from "./DialogModal";
import BlogForm from "./BlogForm";
import { createBlog } from "../actions/blog.action";
import { GetAllBlogs } from "../data/get-all-blogs";

interface BlogListProps {
  blogs: GetAllBlogs;
}

export default function BlogList({ blogs }: BlogListProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const currentUserId = session?.user?.id;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <section className="max-w-[1200px] mx-auto px-8 py-16">
      <header className="mb-16 text-center relative">
        <h1 className="text-center mb-4 font-display text-[3.5rem] font-extrabold bg-linear-to-br from-accent to-accent-hover bg-clip-text text-transparent sm:text-[2.25rem]">
          Blog Forest
        </h1>
        <p className="text-center text-text-secondary text-[1.125rem] max-w-[600px] mx-auto mb-8">
          Explore insights, stories, and tips from our community. Share your own
          squirrel experiences!
        </p>

        {isLoggedIn && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full shadow-lg transition-all hover:bg-accent-hover hover:scale-105 active:scale-95 cursor-pointer"
          >
            Create New Blog
            <span className="text-xl">+</span>
          </button>
        )}
      </header>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} currentUserId={currentUserId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-bg-secondary rounded-[32px] border border-dashed border-border">
          <p className="text-text-muted text-[1.25rem]">
            The forest is empty. Be the first to plant a seed!
          </p>
        </div>
      )}

      <DialogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Plant a New Seed"
      >
        <BlogForm
          action={createBlog}
          submitLabel="Create Blog"
          onSuccess={() => setIsCreateModalOpen(false)}
        />
      </DialogModal>
    </section>
  );
}
