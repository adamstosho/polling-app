'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
              <Navbar />
              <main className="container mx-auto px-4 py-8 flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}