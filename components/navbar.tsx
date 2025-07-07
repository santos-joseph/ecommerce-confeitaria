"use client";

import React from "react";

import Image from "next/image";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";

import { Search, ShoppingCart, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useCart } from "@/components/cart-provider";

import { LiveSearchDropdown } from "@/components/live-search-dropdown";

export function Navbar() {
  const { totalItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const [isMobileSearchFocused, setIsMobileSearchFocused] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const mobileSearchRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setIsMobileSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMobileSearchFocus = () => {
    setIsMobileSearchFocused(true);
  };

  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileSearchQuery(e.target.value);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass-pink shadow-lg backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-lg shadow-sm"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="text-3xl transition-colors duration-300 animate-pulse-slow"
            >
              <Image src="/julogo.svg" alt="Logo" width={100} height={50} />
            </Link>

            {/* Desktop Search */}

            <div ref={searchRef} className="hidden md:block relative">
              <div
                className={`flex items-center space-x-2 glass rounded-full px-3 py-1 hover:shadow-lg transition-all duration-300 group ${isSearchFocused ? "ring-2 ring-pink-300" : ""
                  }`}
              >
                <Search className="h-5 w-5 text-pink-500 group-hover:text-pink-600 transition-colors" />

                <Input
                  type="text"
                  placeholder="Buscar produtos"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  className="bg-transparent border-none focus:outline-none text-sm text-gray-700 w-64 placeholder:text-gray-500"
                />
              </div>
              <LiveSearchDropdown
                isOpen={isSearchFocused}
                searchQuery={searchQuery}
                onClose={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Desktop Menu */}

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/carrinho"
                className="relative flex items-center space-x-2 text-gray-700 hover:text-pink-800 transition-all duration-300 "
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />

                  {isClient && totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-medium">Carrinho</span>
              </Link>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <Link
                href="/carrinho"
                className="relative text-gray-700 hover:text-pink-800 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-pink-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div ref={mobileSearchRef} className="mb-6 relative">
                <div
                  className={`flex items-center space-x-2 glass rounded-full px-4 py-3 transition-all duration-300 ${isMobileSearchFocused ? "ring-2 ring-pink-300" : ""
                    }`}
                >
                  <Search className="h-5 w-5 text-pink-500" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={mobileSearchQuery}
                    onChange={handleMobileSearchChange}
                    onFocus={handleMobileSearchFocus}
                    className="bg-transparent border-none focus:outline-none text-sm text-gray-700 flex-1 placeholder:text-gray-500"
                  />
                </div>
                <LiveSearchDropdown
                  isOpen={isMobileSearchFocused}
                  searchQuery={mobileSearchQuery}
                  onClose={() => setIsMobileSearchFocused(false)}
                />
              </div>
              <div className="space-y-3">
                <Link
                  href="/produtos"
                  className="block text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Todos os Produtos
                </Link>
                <Link
                  href="/categorias/bolos"
                  className="block text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bolos
                </Link>
                <Link
                  href="/categorias/cookies"
                  className="block text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cookies
                </Link>
                <Link
                  href="/categorias/mini-cakes"
                  className="block text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mini Cakes
                </Link>
                <Link
                  href="/categorias/acompanhamentos"
                  className="block text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acompanhamentos
                </Link>

                <div className="border-t border-pink-200 pt-3 mt-3">

                  <Link
                    href="/carrinho"
                    className="flex items-center space-x-3 text-gray-700 hover:text-pink-800 transition-colors p-2 rounded-lg hover:bg-pink-50 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Meu Carrinho {isClient && `(${totalItems})`}</span>
                  </Link>

                </div>
              </div>
            </div>
          )}
        </div>
        <div className="glass border-t border-pink-200/50 hidden md:block">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center items-center space-x-8 py-3 text-sm font-medium text-gray-600">
              <Link
                href="/produtos"
                className="hover:text-pink-700 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-pink-50"
              >
                Todos os Produtos
              </Link>
              <Link
                href="/categorias/bolos"
                className="hover:text-pink-700 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-pink-50"
              >
                Bolos
              </Link>
              <Link
                href="/categorias/cookies"
                className="hover:text-pink-700 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-pink-50"
              >
                Cookies
              </Link>
              <Link
                href="/categorias/mini-cakes"
                className="hover:text-pink-700 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-pink-50"
              >
                Mini Cakes
              </Link>
              <Link
                href="/categorias/acompanhamentos"
                className="hover:text-pink-700 transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full hover:bg-pink-50"
              >
                Acompanhamentos
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
