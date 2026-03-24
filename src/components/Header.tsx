import { Button } from '@/components/ui/button';
import { Rocket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Browse Projects' },
    { href: '/post-project', label: 'Post a Project' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[color:var(--border-soft)] bg-[rgba(10,10,20,0.85)] backdrop-blur-2xl shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary-foreground" />
          </div>
          <span>CollabHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'relative px-3 text-sm font-medium text-[color:var(--text-secondary)] transition-colors duration-200 hover:text-white',
                location.pathname === link.href
                  ? 'text-[color:var(--accent)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:rounded-full after:bg-[color:var(--accent)] after:shadow-[var(--glow)]'
                  : 'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[color:var(--accent)] after:transition-all after:duration-200 hover:after:w-full'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(148,163,184,0.5)] bg-black/20 text-slate-100 rounded-full backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[rgba(24,24,38,0.85)] hover:border-[rgba(167,139,250,0.9)] hover:shadow-[0_0_18px_rgba(167,139,250,0.45)]"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-[var(--glow)] bg-primary hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(129,140,248,0.75)]"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full hover:bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[color:var(--border-soft)] bg-[rgba(10,10,20,0.95)] backdrop-blur-2xl">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block text-sm font-medium py-2 transition-colors hover:text-white',
                  location.pathname === link.href
                    ? 'text-[color:var(--accent)]'
                    : 'text-[color:var(--text-secondary)]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-white/5 rounded-full"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[var(--glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(129,140,248,0.75)]"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
