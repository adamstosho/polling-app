'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './button';
import { Vote, Menu, X, User, LogOut, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  const handleRecentPollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      setTimeout(() => {
        const el = document.getElementById('recent-poll');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        window.location.hash = 'recent-poll';
        setIsMenuOpen(false);
      }, 0);
    }
    // else, let the link work as normal
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PollFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center w-full">
            {/* Centered nav links */}
            <div className="flex-1 flex justify-center items-center gap-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <span>Home</span>
              </Link>

              <Link
                href="/create"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <span>Create Poll</span>
              </Link>
              <a
                href="/#recent-poll"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={handleRecentPollClick}
              >
                <span>Recent-Poll</span>
              </a>


            </div>
            {/* User/Profile/Actions */}
            {user ? (
              <div className="flex items-center space-x-6">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>My Polls</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Link href={"/profile"} className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </Link>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="space-y-2 mb-4">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Create Poll
                </Link>
                <a
                  href="/#recent-poll"
                  onClick={handleRecentPollClick}
                  className="block px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Recent Poll
                </a>
              </div>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>My Polls</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-2 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}