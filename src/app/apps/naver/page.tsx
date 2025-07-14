import Link from 'next/link';

export default function NaverPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          네이버 서비스
        </h2>
        <p className="text-gray-600 mb-6">
          네이버의 다양한 서비스들을 체험해보세요. 검색, 뉴스, 지도 등 다양한
          기능을 제공합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">네이버 검색</h3>
            <p className="text-sm text-green-700 mb-3">통합 검색 서비스</p>
            <Link
              href="/naver/search"
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              검색하기 →
            </Link>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">네이버 뉴스</h3>
            <p className="text-sm text-green-700 mb-3">실시간 뉴스 서비스</p>
            <Link
              href="/naver/news"
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              뉴스 보기 →
            </Link>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">네이버 지도</h3>
            <p className="text-sm text-green-700 mb-3">지도 및 길찾기</p>
            <Link
              href="/naver/map"
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              지도 보기 →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">최근 활동</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">검색 기록이 저장되었습니다</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">뉴스 구독이 활성화되었습니다</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">
              지도 즐겨찾기가 업데이트되었습니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
