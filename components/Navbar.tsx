"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartHandshake, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"night" | "corporate">("night");

  useEffect(() => {
    const saved = localStorage.getItem("vs-theme") as
      | "night"
      | "corporate"
      | null;
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "night" ? "corporate" : "night";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("vs-theme", next);
  };

  return (
    <div className="navbar bg-base-200/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-300 px-4">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <HeartHandshake size={30} className="text-primary-content" />
          </div>
          <div>
            <span className="font-bold text-base-content heading text-lg leading-none">
              VectoSense
            </span>
            <i className="text-xs text-base-content/50 leading-none hidden sm:block">
              Genomic Resistance Intelligence
            </i>
          </div>
        </Link>
      </div>

      <div>
        <Link
          href="/explore"
          className="btn btn-primary btn-sm hidden sm:flex mr-6 text-base py-5 px-4"
        >
          Explore Now!
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Toggle theme"
      >
        {theme === "night" ? <Sun size={25} /> : <Moon size={25} />}
      </button>
    </div>
  );
}
