import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SARA - 멀티존 앱',
  description: 'Next.js 멀티존 앱 라우터 데모',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`} suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
