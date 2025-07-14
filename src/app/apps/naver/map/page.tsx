'use client';

import { useState } from 'react';

export default function NaverMapPage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const popularLocations = [
    { name: '강남역', address: '서울특별시 강남구 강남대로 396' },
    { name: '홍대입구역', address: '서울특별시 마포구 양화로 160' },
    { name: '명동', address: '서울특별시 중구 명동길 14' },
    { name: '동대문', address: '서울특별시 중구 장충단로 253' },
  ];

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      setSelectedLocation(searchLocation);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">네이버 지도</h2>

        <form onSubmit={handleLocationSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="장소를 검색하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              검색
            </button>
          </div>
        </form>

        {selectedLocation && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">선택된 위치</h3>
            <p className="text-green-700">{selectedLocation}</p>
          </div>
        )}

        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">지도가 여기에 표시됩니다</p>
            {selectedLocation && (
              <p className="text-sm text-gray-500 mt-1">
                위치: {selectedLocation}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">인기 장소</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularLocations.map((location) => (
            <div
              key={location.name}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedLocation(location.name)}
            >
              <h4 className="font-semibold text-gray-900 mb-1">
                {location.name}
              </h4>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">길찾기</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              출발지
            </label>
            <input
              type="text"
              placeholder="출발지를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              도착지
            </label>
            <input
              type="text"
              placeholder="도착지를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            경로 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
