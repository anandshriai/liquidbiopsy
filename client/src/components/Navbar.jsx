import { useState, useEffect } from "react";

const links = [
  { label: "What We Do", href: "#solution" },
  { label: "Impact", href: "#impact" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function scrollToHash(e, href, callback) {
  e.preventDefault();
  if (callback) callback();
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-xl font-bold tracking-tight"
        >
          <span className={scrolled ? "text-slate-900" : "text-white"}>
            Onco
          </span>
          <span className="text-emerald-500">TraceAI</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollToHash(e, l.href)}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? (
            <CloseIcon
              className={scrolled ? "text-slate-900" : "text-white"}
            />
          ) : (
            <MenuIcon
              className={scrolled ? "text-slate-900" : "text-white"}
            />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-64 border-t border-slate-100" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollToHash(e, l.href, () => setOpen(false))}
                className="block rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}