'use client';

import { useState } from 'react';

export default function GoogleSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 시뮬레이션된 검색 결과
      const mockResults = [
        `${searchQuery}에 대한 구글 검색 결과 1`,
        `${searchQuery}에 대한 구글 검색 결과 2`,
        `${searchQuery}에 대한 구글 검색 결과 3`,
        `${searchQuery}에 대한 구글 검색 결과 4`,
        `${searchQuery}에 대한 구글 검색 결과 5`,
      ];
      setSearchResults(mockResults);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">구글 검색</h2>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="구글에서 검색하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              검색
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">검색 결과</h3>
            {searchResults.map((result, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-700">{result}</p>
                <p className="text-sm text-gray-500 mt-1">
                  https://google.com/result-{index + 1}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          인기 검색어
        </h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'JavaScript', '멀티존'].map(
            (term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                {term}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
