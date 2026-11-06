"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getAllProducts } from "@/lib/products";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/ingredients", label: "Ingredients" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return getAllProducts().filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(q),
    );
  }, [query]);

  const solid = scrolled || menuOpen || searchOpen;

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-gold/10 bg-midnight/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeAll}
          className="font-script text-2xl leading-none text-gold transition-opacity hover:opacity-80 sm:text-[1.7rem]"
        >
          Aamna&rsquo;s Elixir
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                  active ? "text-gold" : "text-ivory/60 hover:text-champagne"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((v) => !v);
            }}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="rounded-full p-2 text-ivory/70 transition-colors hover:text-gold"
          >
            {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative rounded-full p-2 text-ivory/70 transition-colors hover:text-gold"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson px-1 text-[10px] font-semibold text-ivory">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen((v) => !v);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-ivory/70 transition-colors hover:text-gold md:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gold/10 bg-midnight/95 px-5 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="font-sans text-sm uppercase tracking-[0.28em] text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-gold/10 bg-midnight/95 px-5 py-6 backdrop-blur-md">
          <div className="mx-auto max-w-2xl">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              autoFocus
              className="w-full border-b border-gold/30 bg-transparent py-3 font-sans text-base text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            {query.trim() && (
              <ul className="mt-4 divide-y divide-white/5">
                {results.length === 0 ? (
                  <li className="py-3 font-sans text-sm text-ivory/50">
                    No products found.
                  </li>
                ) : (
                  results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={closeAll}
                        className="flex items-center justify-between py-3 transition-colors hover:text-gold"
                      >
                        <span className="font-serif text-lg text-ivory">
                          {p.name}
                        </span>
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50">
                          {p.category}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
