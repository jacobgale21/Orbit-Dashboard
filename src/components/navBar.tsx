// src/components/layout/SiteNavbar.tsx
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Missions", href: "#missions" },
  { label: "Timeline", href: "#timeline" },
  { label: "Destinations", href: "#destinations" },
  { label: "Discoveries", href: "#discoveries" },
  { label: "About", href: "#about" },
];

export default function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-space-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-sm font-semibold tracking-[0.2em]">
          ORBIT
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </button>
          <Button variant="ghost" className="text-white/80 hover:text-white">
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="ghost" className="text-white/80 hover:text-white">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
