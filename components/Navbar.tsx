"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Microscope , Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"night" | "corporate">("night");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("vs-theme") as
      | "night"
      | "corporate"
      | null;
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "night" ? "corporate" : "night";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("vs-theme", next);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 no-print">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Microscope
              size={20}
              className="text-primary-content"
              strokeWidth={2.5}
            />
          </div>
          <div className="leading-none">
            <span className="font-heading font-bold text-base-content text-lg tracking-tight">
              VectoSense
            </span>
            <p className="text-[10px] text-base-content/40 tracking-widest uppercase hidden sm:block mt-0.5">
              Resistance Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                pathname === href
                  ? "bg-primary text-primary-content"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-200",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Toggle theme"
          >
            {theme === "night" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            href="/explore"
            className="btn btn-primary btn-sm hidden sm:flex"
          >
            View Resistance Map
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="btn btn-ghost btn-sm btn-circle sm:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-base-300 bg-base-100 px-4 py-3 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={[
                "px-4 py-2.5 rounded-lg text-sm font-medium",
                pathname === href
                  ? "bg-primary text-primary-content"
                  : "text-base-content/70",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
