'use client';

import { useState } from 'react';

export default function GmailPage() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const emails = [
    {
      id: 1,
      from: 'Next.js Team',
      subject: 'Next.js 15 새로운 기능 안내',
      preview:
        'Next.js 15에서 앱 라우터와 서버 컴포넌트의 성능이 크게 향상되었습니다...',
      time: '10분 전',
      unread: true,
    },
    {
      id: 2,
      from: 'React Team',
      subject: 'React 19 베타 버전 공개',
      preview:
        'React 19에서 새로운 훅과 컴파일러 최적화 기능이 추가되었습니다...',
      time: '1시간 전',
      unread: true,
    },
    {
      id: 3,
      from: 'TypeScript Team',
      subject: 'TypeScript 5.5 릴리즈',
      preview: 'TypeScript 5.5에서 타입 추론과 성능이 개선되었습니다...',
      time: '3시간 전',
      unread: false,
    },
    {
      id: 4,
      from: 'Tailwind CSS',
      subject: 'Tailwind CSS v4.0 알파 버전',
      preview: 'Tailwind CSS v4.0에서 새로운 기능들이 추가되었습니다...',
      time: '5시간 전',
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Gmail</h2>

        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            새 메일 작성
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            받은 편지함
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            보낸 편지함
          </button>
        </div>

        <div className="space-y-2">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedEmail === email.id
                  ? 'bg-red-50 border-red-300'
                  : email.unread
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedEmail(email.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {email.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  <span className="font-semibold text-gray-900">
                    {email.from}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{email.time}</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">
                {email.subject}
              </h3>
              <p className="text-sm text-gray-600">{email.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEmail && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            메일 내용
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">보낸 사람:</span>
              <p className="font-medium">
                {emails.find((e) => e.id === selectedEmail)?.from}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">제목:</span>
              <p className="font-medium">
                {emails.find((e) => e.id === selectedEmail)?.subject}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">내용:</span>
              <p className="text-gray-700 mt-2">
                안녕하세요!
                <br />
                <br />
                {emails.find((e) => e.id === selectedEmail)?.preview}
                <br />
                <br />
                더 자세한 내용은 첨부된 문서를 참고해 주세요.
                <br />
                <br />
                감사합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
