import Link from "next/link";
import { navLinks } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border py-20 pb-10 text-text-primary md:py-16 md:pb-8">

      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex justify-between gap-16 mb-16 md:flex-col md:gap-10 md:text-center">
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-[1.5rem] font-extrabold text-text-primary">
              Squirrel<span className="text-accent">World</span>
            </h3>
            <p className="max-w-[300px] text-[0.95rem] text-text-secondary md:mx-auto">
              Advocating for the clever gardeners of our forests.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[1.1rem] font-bold text-text-primary">Explore</h4>
            <nav className="flex flex-col gap-3 md:items-center">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.to}
                  className="text-text-secondary text-[0.9rem] transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="pt-10 border-t border-border flex justify-between items-center text-[0.85rem] text-text-muted md:flex-col md:gap-4 md:text-center">
          <p>&copy; {currentYear} Squirrel World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

