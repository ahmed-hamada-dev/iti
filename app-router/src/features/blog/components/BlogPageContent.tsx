"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DeleteBlogButton from "@/features/blog/components/DeleteBlogButton";
import DialogModal from "./DialogModal";
import BlogForm from "./BlogForm";
import { updateBlog } from "../actions/blog.action";
import { GetBlogById } from "../data/get-blog-by-id";

interface BlogPageContentProps {
  blog: NonNullable<GetBlogById>;
}

export default function BlogPageContent({
  blog,
}: BlogPageContentProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isOwner = session?.user?.id === blog.authorId;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const blogImage = blog.image || "/images/hero.png";

  return (
    <article className="max-w-[1000px] mx-auto my-16 bg-card-bg rounded-[32px] shadow-card overflow-hidden flex flex-col fade-in border border-border">
      <div className="w-full h-[400px] relative">
        <Image
          fill
          src={blogImage}
          alt={blog.title}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <Link
            href="/blogs"
            className="text-white/80 hover:text-white mb-6 inline-block text-[0.9rem] font-medium transition-all hover:-translate-x-1"
          >
            &larr; Back to Forest
          </Link>
          <h1 className="text-[3.5rem] font-bold text-white leading-tight md:text-[2.5rem]">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="p-12 md:p-8">
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-border md:flex-col md:items-start md:gap-6">
          <div className="flex items-center gap-4">
            {blog.author?.image ? (
              <Image
                src={blog.author.image}
                alt={blog.author.name || "Author"}
                width={56}
                height={56}
                className="rounded-full border-2 border-accent"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[1.25rem]">
                {blog.author?.name ? blog.author.name[0] : "U"}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-[1.1rem] text-text-primary">
                {blog.author?.name || "Unknown Author"}
              </span>
              <span className="text-[0.9rem] text-text-muted">
                Published on {new Date(blog.createdAt).toLocaleDateString()}
                {blog.updatedAt > blog.createdAt && " (Edited)"}
              </span>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-6 py-3 bg-bg-secondary text-text-primary font-bold rounded-xl border border-border transition-all hover:bg-border"
              >
                Edit
              </button>
              <DeleteBlogButton id={blog.id} />
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
          {blog.content.split("\n").map((para, i) => (
            <p key={i} className="mb-6">
              {para}
            </p>
          ))}
        </div>
      </div>

      <DialogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Your Seed"
      >
        <BlogForm
          initialData={blog}
          action={updateBlog.bind(null, blog.id)}
          submitLabel="Save Changes"
          onSuccess={() => setIsEditModalOpen(false)}
        />
      </DialogModal>
    </article>
  );
}
