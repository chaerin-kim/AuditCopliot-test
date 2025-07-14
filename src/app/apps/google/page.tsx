import Link from 'next/link';

export default function GooglePage() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-red-700 mb-4">구글 서비스</h2>
        <p className="text-gray-600 mb-6">
          구글의 다양한 서비스들을 체험해보세요. 검색, 이메일, 클라우드 등
          다양한 기능을 제공합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">구글 검색</h3>
            <p className="text-sm text-red-700 mb-3">세계 최고의 검색 엔진</p>
            <Link
              href="/google/search"
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              검색하기 →
            </Link>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">Gmail</h3>
            <p className="text-sm text-red-700 mb-3">이메일 서비스</p>
            <Link
              href="/google/gmail"
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              메일 확인 →
            </Link>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">구글 드라이브</h3>
            <p className="text-sm text-red-700 mb-3">클라우드 스토리지</p>
            <Link
              href="/google/drive"
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              파일 관리 →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">최근 활동</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">검색 기록이 동기화되었습니다</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">새 이메일이 도착했습니다</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">
              드라이브 파일이 업데이트되었습니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
