'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { name: 'Tools', href: '/tools' },
  { name: 'Hubs', href: '/tool-hubs' },
  { name: 'Blog', href: '/blog' },
  { name: 'Guides', href: '/guides' },
  { name: 'Resources', href: '/resources' },
  { name: 'Start Here', href: '/start-here' },
];

const mobileCategories = ['Loans', 'Savings', 'Tax', 'Salary', 'Retirement', 'Housing'];

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  );
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  function toggleTheme() {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.classList.toggle('dark', nextDarkMode);
    localStorage.setItem('rupeekit-theme', nextDarkMode ? 'dark' : 'light');
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-brandBorder bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 ${
        scrolled ? 'shadow-sm' : ''
      } transition-shadow duration-200`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex min-h-11 items-center" aria-label="RupeeKit home">
          <Logo type="horizontal" width={140} height={35} className="h-8 md:h-9" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-brandText dark:text-slate-200 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="flex min-h-11 items-center transition hover:text-brandNavy dark:hover:text-white">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brandBorder text-brandText transition hover:border-brandNavy/30 hover:bg-brandBgSoft hover:text-brandNavy dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}
            title={darkMode ? 'Use light theme' : 'Use dark theme'}
          >
            <ThemeIcon dark={darkMode} />
          </button>
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
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-brandBorder text-brandText dark:border-slate-700 dark:text-slate-200"
            aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}
          >
            <ThemeIcon dark={darkMode} />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-brandBorder text-brandText transition hover:bg-brandBgSoft dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
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
            className="relative z-50 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-brandBorder bg-white px-4 py-5 shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center rounded-xl px-3 text-sm font-bold text-brandText transition hover:bg-brandBgSoft hover:text-brandNavy dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 border-t border-brandBorder pt-4 dark:border-slate-800">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brandMuted dark:text-slate-400">Calculator categories</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mobileCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/tools#${category.toLowerCase()}`}
                      onClick={closeMobileMenu}
                      className="flex min-h-11 items-center rounded-full border border-brandBorder px-4 text-sm font-bold text-brandNavy dark:border-slate-700 dark:text-brandBrightGreen"
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
