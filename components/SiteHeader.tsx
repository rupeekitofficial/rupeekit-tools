'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { name: 'Tools', href: '/tools' },
  { name: 'Blog', href: '/blog' },
  { name: 'Guides', href: '/guides' },
  { name: 'Resources', href: '/resources' },
  { name: 'Start Here', href: '/start-here' },
];

const mobileCategories = ['Loans', 'Savings', 'Tax', 'Salary', 'Retirement', 'Housing'];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape + lock body scroll while the drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-brandBorder bg-white/90 backdrop-blur-xl ${
        scrolled ? 'shadow-sm' : ''
      } transition-shadow duration-200`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex min-h-11 items-center" aria-label="RupeeKit home">
          <Logo type="horizontal" width={140} height={35} className="h-8 md:h-9" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-brandText md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="flex min-h-11 items-center transition hover:text-brandNavy">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/money-health-check"
            className="flex min-h-11 items-center rounded-full bg-brandGrowthGreen px-5 text-sm font-black text-white shadow-sm transition hover:bg-brandBrightGreen hover:shadow-md"
          >
            Money Health Check
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-brandBorder text-brandText transition hover:bg-brandBgSoft"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer with backdrop */}
      {mobileMenuOpen ? (
        <div className="md:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          />
          <div
            id="mobile-navigation"
            className="relative z-50 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-brandBorder bg-white px-4 py-5 shadow-xl"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center rounded-xl px-3 text-sm font-bold text-brandText transition hover:bg-brandBgSoft hover:text-brandNavy"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-brandBorder pt-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brandMuted">Calculator categories</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mobileCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/tools#${category.toLowerCase()}`}
                      onClick={closeMobileMenu}
                      className="flex min-h-11 items-center rounded-full border border-brandBorder px-4 text-sm font-bold text-brandNavy"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/money-health-check"
                onClick={closeMobileMenu}
                className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-brandGrowthGreen px-5 text-sm font-black text-white shadow-sm transition hover:bg-brandBrightGreen"
              >
                Check your money health
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}