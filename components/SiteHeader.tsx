'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Tools', href: '/#calculators' },
    { name: 'Blog', href: '/blog' },
    { name: 'Resources', href: '/resources' },
    { name: 'Start Here', href: '/start-here' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brandBorder bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo type="horizontal" width={140} height={35} className="h-8 md:h-9" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-brandText md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-brandNavy"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/money-health-check"
            className="rounded-full bg-brandGrowthGreen px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brandBrightGreen hover:shadow-md"
          >
            Money Health Check
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brandBorder text-brandText hover:bg-brandBgSoft md:hidden"
          aria-label="Toggle Menu"
          id="mobile-menu-btn"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-brandBorder bg-white py-4 shadow-inner md:hidden">
          <nav className="flex flex-col gap-4 px-4 text-base font-semibold text-brandText">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition hover:text-brandNavy"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/money-health-check"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-xl bg-brandGrowthGreen py-3 text-center font-bold text-white shadow-sm transition hover:bg-brandBrightGreen"
            >
              Money Health Check
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
