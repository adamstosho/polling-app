import Link from 'next/link';
import { Vote, Mail, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-white via-purple-50 to-blue-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 md:gap-0 md:items-start md:justify-between">
        {/* Left: Logo & Description */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-3 mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">PollFlow</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
            Real-time polls made easy. Create, share, and visualize results instantly with beautiful analytics.
          </p>
        </div>
        {/* Center: Quick Links */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <span className="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-2">Quick Links</span>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <Link href="/" className="hover:text-purple-600 transition-colors text-gray-700">Home</Link>
            <Link href="/create" className="hover:text-purple-600 transition-colors text-gray-700">Create Poll</Link>
            <Link href="/profile" className="hover:text-purple-600 transition-colors text-gray-700">My Polls</Link>
            <Link href="/about" className="hover:text-purple-600 transition-colors text-gray-700">About</Link>
          </div>
        </div>
        {/* Right: Contact/Social */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-2">
          <span className="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-2">Contact</span>
          <a href="mailto:support@pollflow.com" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors text-sm">
            <Mail className="w-4 h-4" /> support@pollflow.com
          </a>
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors text-sm">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>
      <div className="w-full border-t border-gray-100 bg-white/70 py-4 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} PollFlow. All rights reserved.</span>
          <span>Made with ❤️ for real-time feedback.</span>
        </div>
      </div>
    </footer>
  );
} 