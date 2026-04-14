"use client";

import { navLinks } from "@/lib/constants";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import HeaderNav from "./HeaderNav";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-100 bg-bg-primary border-b border-border transition-colors duration-300">
      <div className="py-3">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
          <Link
            href="/"
            className="font-display text-[1.5rem] font-extrabold text-text-primary tracking-tight"
          >
            Squirrel<span className="text-accent">World</span>
          </Link>
          <div className="flex items-center gap-8">
            <HeaderNav navLinks={navLinks} />

            <div className="pl-6 border-l border-border h-8 flex items-center">
              {status === "loading" ? (
                <div className="w-10 h-10 rounded-full bg-border animate-pulse" />
              ) : session?.user ? (
                <UserMenu user={session.user} />
              ) : (
                <Link
                  href="/login"
                  className="bg-accent text-white px-5 py-2 rounded-full font-bold text-[0.95rem] transition-transform hover:scale-105 hover:bg-accent-hover active:scale-95 shadow-sm"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
