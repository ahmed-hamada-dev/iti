"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderNavProps {
  navLinks: { to: string; label: string }[];
}

export default function HeaderNav({ navLinks }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          href={link.to}
          className={`font-medium text-[0.95rem] transition-colors relative hover:text-accent group ${
            pathname === link.to ? "text-accent" : "text-text-secondary"
          }`}
        >
          {link.label}
          <span
            className={`absolute bottom-[-4px] left-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full ${
              pathname === link.to ? "w-full" : "w-0"
            }`}
          ></span>
        </Link>
      ))}
    </nav>
  );
}
