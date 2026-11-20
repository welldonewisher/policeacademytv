import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Shield, ChevronDown, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const videoSubmenu = [
  { label: 'All Videos', href: '/videos', desc: 'Browse the full library' },
  { label: 'Tactical Training', href: '/videos', desc: 'SWAT, entry, response' },
  { label: 'Firearms', href: '/videos', desc: 'Range drills & qualification' },
  { label: 'Leadership', href: '/videos', desc: 'Command & decision-making' },
];

const navLinks = [
  { label: 'Browse', href: '/listings' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
];

function VideosDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-1 text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-200 group py-1"
      >
        <Play className="w-3.5 h-3.5 text-primary" />
        Videos
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300 ease-out" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-card border border-border rounded-lg shadow-xl shadow-black/40 overflow-hidden z-50"
          >
            {videoSubmenu.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col px-4 py-3 hover:bg-secondary/60 transition-colors duration-150 border-b border-border last:border-0"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary">{item.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[hsl(var(--background))]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/airo-assets/images/logo/horizontal/dark"
              alt="POLICACADEMYTV"
              className="h-auto max-h-10 md:max-h-12 w-auto max-w-[200px] object-contain self-center"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-200 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
            {/* Videos dropdown */}
            <VideosDropdown />
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/listings"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded tracking-wide hover:bg-primary/90 transition-colors duration-200"
            >
              <Shield className="w-4 h-4" />
              Submit Listing
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[hsl(var(--background))]/98 backdrop-blur-md border-t border-border"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/videos"
                className="flex items-center gap-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
              >
                <Play className="w-4 h-4 text-primary" />
                Videos
              </Link>
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link
                  to="/listings"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded tracking-wide"
                >
                  <Shield className="w-4 h-4" />
                  Submit Listing
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
