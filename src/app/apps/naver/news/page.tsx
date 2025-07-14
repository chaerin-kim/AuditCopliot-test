export default function NaverNewsPage() {
  const newsItems = [
    {
      id: 1,
      title: 'Next.js 15 새로운 기능 발표',
      summary:
        'Next.js 15에서 앱 라우터와 서버 컴포넌트의 성능이 크게 향상되었습니다.',
      category: '기술',
      time: '2시간 전',
      image: 'https://via.placeholder.com/120x80/4ade80/ffffff?text=Tech',
    },
    {
      id: 2,
      title: 'React 19 베타 버전 공개',
      summary:
        'React 19에서 새로운 훅과 컴파일러 최적화 기능이 추가되었습니다.',
      category: '개발',
      time: '4시간 전',
      image: 'https://via.placeholder.com/120x80/60a5fa/ffffff?text=Dev',
    },
    {
      id: 3,
      title: 'TypeScript 5.5 릴리즈',
      summary: 'TypeScript 5.5에서 타입 추론과 성능이 개선되었습니다.',
      category: '프로그래밍',
      time: '6시간 전',
      image: 'https://via.placeholder.com/120x80/8b5cf6/ffffff?text=TS',
    },
    {
      id: 4,
      title: '멀티존 아키텍처의 장점',
      summary:
        '대규모 애플리케이션에서 멀티존 구조가 어떻게 도움이 되는지 알아봅니다.',
      category: '아키텍처',
      time: '8시간 전',
      image: 'https://via.placeholder.com/120x80/f59e0b/ffffff?text=Arch',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">네이버 뉴스</h2>

        <div className="flex gap-4 mb-6">
          {['전체', '기술', '개발', '프로그래밍', '아키텍처'].map(
            (category) => (
              <button
                key={category}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="space-y-4">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-30 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">뉴스 구독</h3>
        <p className="text-gray-600 mb-4">
          관심 있는 카테고리의 뉴스를 실시간으로 받아보세요.
        </p>
        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          구독하기
        </button>
      </div>
    </div>
  );
}
