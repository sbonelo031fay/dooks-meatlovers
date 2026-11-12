import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  displayName: string;
  isSampleData: boolean;
}

export function Header({ displayName, isSampleData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
      isActive
        ? 'bg-orange-700 text-orange-50'
        : 'text-orange-100 hover:bg-stone-800 hover:text-orange-50'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800 bg-stone-950/95 backdrop-blur">
      {isSampleData && (
        <div
          role="region"
          aria-label="Sample data development notice"
          className="border-b border-amber-500/30 bg-amber-950/90 px-4 py-2 text-center text-xs font-medium text-amber-200"
        >
          <strong className="font-bold uppercase tracking-wider text-amber-300">
            [Sample Data Mode]
          </strong>{' '}
          Menu items, prices, and contact placeholders shown below are sample
          fixtures pending owner confirmation in{' '}
          <code className="rounded bg-stone-900 px-1.5 py-0.5 text-amber-100">
            docs/content-checklist.md
          </code>
          .
        </div>
      )}

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-600/50 bg-orange-700 font-display text-xl font-bold uppercase text-orange-50 shadow">
            DM
          </span>
          <div>
            <span className="block font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-orange-50 group-hover:text-amber-300 transition-colors">
              {displayName}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-stone-400">
              SA BBQ Deli &amp; Bakery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-2"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Full Menu
          </NavLink>
          <Link
            to="/#custom-cakes"
            className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800 hover:text-orange-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Custom Cakes
          </Link>
          <Link
            to="/#visit-us"
            className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800 hover:text-orange-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Visit &amp; Contact
          </Link>
        </nav>

        {/* Mobile Hamburger Button (minimum 44x44px tap target) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-stone-800 bg-stone-900 p-2.5 text-orange-100 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-400 md:hidden"
        >
          <span className="sr-only">Menu</span>
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="border-t border-stone-800 bg-stone-900 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Full Menu
            </NavLink>
            <Link
              to="/#custom-cakes"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800 rounded-lg"
            >
              Custom Cakes
            </Link>
            <Link
              to="/#visit-us"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider text-orange-100 hover:bg-stone-800 rounded-lg"
            >
              Visit &amp; Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
