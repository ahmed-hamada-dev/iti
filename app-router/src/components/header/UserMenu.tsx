"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function UserMenu({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-bg-secondary p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-border"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={36}
            height={36}
            className="rounded-full shadow-sm"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            {user.name?.[0] || user.email?.[0] || "U"}
          </div>
        )}
        <span className="font-semibold text-[0.95rem] tracking-tight hidden sm:block">
          {user.name && user.name.split(" ")[0]}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-card-bg border border-border rounded-[16px] shadow-card overflow-hidden fade-in text-[0.95rem]">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-bold text-text-primary truncate">
              {user.name}
            </p>
            <p className="text-text-muted text-[0.85rem] truncate">
              {user.email}
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 font-medium transition-colors rounded-[8px]"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
