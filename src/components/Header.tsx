'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">SARA</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link
              href="/weather-app"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              날씨 앱
            </Link>
            <Link
              href="/notes-app"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              노트 앱
            </Link>
            <Link
              href="/auth-app"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              인증 앱
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
