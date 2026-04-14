"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DialogModal from "./DialogModal";
import BlogForm from "./BlogForm";
import { updateBlog, deleteBlog } from "../actions/blog.action";
import { GetAllBlogs } from "../data/get-all-blogs";

interface BlogCardProps {
  blog: GetAllBlogs[number];
  currentUserId?: string;
}

export default function BlogCard({ blog, currentUserId }: BlogCardProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const blogImage = blog.image || "/images/hero.png"; 
  const isOwner = currentUserId && blog.author?.id === currentUserId;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    const result = await deleteBlog(blog.id);
    if (result.success) {
      router.refresh();
      setIsDeleteModalOpen(false);
    } else {
      alert(result.message);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <Link
        href={`/blogs/${blog.id}`}
        className="group bg-card-bg border border-border rounded-[20px] overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-accent flex flex-col fade-in cursor-pointer relative"
      >
        <div className="w-full h-[240px] relative overflow-hidden">
          <Image
            width={500}
            height={500}
            src={blogImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <span className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-[0.75rem] font-bold tracking-wider uppercase border border-white/30 shadow-sm">
            Article
          </span>
          
          {/* 3 Dots Menu for Author */}
          {isOwner && (
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={handleMenuClick}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 transition-all hover:bg-black/60 shadow-lg hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </button>
              
              {isMenuOpen && (
                <div 
                  className="absolute left-0 mt-2 w-32 bg-card-bg border border-border rounded-xl shadow-xl overflow-hidden py-1 z-20"
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <button
                    onClick={handleEditClick}
                    className="w-full text-left px-4 py-2 text-[0.9rem] font-semibold text-text-primary hover:bg-bg-secondary hover:text-accent transition-colors"
                  >
                    Edit Blog
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="w-full text-left px-4 py-2 text-[0.9rem] font-semibold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Delete Blog
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8 flex flex-col grow">
          <h3 className="m-0 mb-3 font-display text-[1.5rem] font-bold text-text-primary group-hover:text-accent transition-colors">
            {blog.title}
          </h3>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-6 grow line-clamp-3">
            {blog.content}
          </p>

          <div className="flex items-center gap-4 mb-6 p-4 bg-bg-secondary rounded-[12px]">
            {blog.author?.image ? (
               <Image 
                 src={blog.author.image} 
                 alt={blog.author.name || "Author"} 
                 width={32} 
                 height={32} 
                 className="rounded-full"
               />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[0.75rem]">
                {blog.author?.name ? blog.author.name[0] : "U"}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-[0.85rem] text-text-primary">
                {blog.author?.name || "Unknown Author"}
              </span>
              <span className="text-[0.75rem] text-text-muted">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="w-full p-4 bg-accent text-white text-center text-[1rem] font-bold rounded-[12px] transition-all duration-150 flex items-center justify-center gap-2 group-hover:bg-accent-hover group-hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
            Read Article
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>

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

      <DialogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete this blog?"
      >
        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Are you sure you want to delete this blog? This action cannot be
            undone, and the seed will be permanently removed from the forest.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsDeleteModalOpen(false); }}
              disabled={isDeleting}
              className="px-6 py-3 font-semibold text-text-primary bg-bg-secondary border border-border rounded-[12px] hover:bg-border transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-6 py-3 font-semibold text-white bg-red-600 rounded-[12px] hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete It"}
            </button>
          </div>
        </div>
      </DialogModal>
    </>
  );
}
