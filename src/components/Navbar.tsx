"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">✍️</span>
            <span
              className={`font-bold text-lg ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              AI文案生成器
            </span>
          </a>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              功能
            </a>
            <a
              href="#pricing"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              价格
            </a>
            <a
              href="#"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              教程
            </a>
            <a
              href="#pricing"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              }`}
            >
              免费试用
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={`w-6 h-6 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-900 font-medium hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                功能
              </a>
              <a
                href="#pricing"
                className="text-gray-900 font-medium hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                价格
              </a>
              <a
                href="#"
                className="text-gray-900 font-medium hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                教程
              </a>
              <a
                href="#pricing"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                免费试用
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
