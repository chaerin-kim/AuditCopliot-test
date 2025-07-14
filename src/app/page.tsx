export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SARA 멀티존 앱에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Next.js 앱 라우터를 사용한 멀티존 구조 데모
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              네이버
            </h2>
            <p className="text-gray-600 mb-4">
              네이버 서브앱으로 이동하여 네이버 관련 기능을 사용해보세요.
            </p>
            <a
              href="/naver"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              네이버로 이동
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">구글</h2>
            <p className="text-gray-600 mb-4">
              구글 서브앱으로 이동하여 구글 관련 기능을 사용해보세요.
            </p>
            <a
              href="/google"
              className="inline-block bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              구글으로 이동
            </a>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            멀티존 구조의 특징
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• 헤더가 유지되면서 서브앱 간 이동</li>
            <li>• 각 서브앱은 독립적인 라우팅 구조</li>
            <li>• 공통 레이아웃과 컴포넌트 재사용</li>
            <li>• Next.js 앱 라우터의 강력한 기능 활용</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
