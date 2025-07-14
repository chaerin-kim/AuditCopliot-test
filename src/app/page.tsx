export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            SARA - 통합 앱 플랫폼
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            다양한 웹 애플리케이션을 하나의 플랫폼에서 사용하세요
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                날씨 앱
              </h3>
              <p className="text-gray-600 mb-4">
                실시간 날씨 정보를 확인할 수 있는 React 애플리케이션입니다.
              </p>
              <a
                href="/weather-app"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                날씨 앱 사용하기
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                노트 앱
              </h3>
              <p className="text-gray-600 mb-4">
                메모와 노트를 작성하고 관리할 수 있는 React 애플리케이션입니다.
              </p>
              <a
                href="/notes-app"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                노트 앱 사용하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
