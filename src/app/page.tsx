'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const searchParams = useSearchParams();
  const currentZone = searchParams.get('zone') || 'zone1';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 자식 앱으로부터의 메시지 수신 처리
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // LeaseAI의 도메인 확인 (개발환경)
      if (event.origin !== 'http://localhost:3000') return;

      // AUTH_RESULT 메시지 처리
      if (event.data.type === 'AUTH_RESULT') {
        if (event.data.payload.success) {
          console.log("인증 성공:", event.data.payload.email);
        } else {
          console.error("인증 실패:", event.data.payload.error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 테스트 인증 전송 함수
  const sendTestAuth = () => {
    if (iframeRef.current?.contentWindow) {
      const testAuth = {
        type: 'AUTH_INFO',
        payload: {
          email: "chae-rin.kim@pwc.com",
          token: "test_token_" + Date.now(),
          clientId: "test_client"
        }
      };
      
      console.log('Sending test auth:', testAuth);
      iframeRef.current.contentWindow.postMessage(testAuth, 'http://localhost:3000');
    } else {
      console.error('iframe contentWindow not found');
    }
  };

  const renderZoneContent = () => {
    switch (currentZone) {
      case 'zone1':
        return (
          <div className="relative w-full h-full">
            {/* 테스트 버튼 추가 */}
            <button 
              onClick={sendTestAuth}
              className="absolute top-4 right-4 z-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              LeaseAI 테스트 로그인
            </button>
            <iframe
              ref={iframeRef}
              id="leaseAIFrame"
              src="http://localhost:3000"
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          </div>
        );
      case 'zone2':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zone 2</h2>
            <p className="text-gray-600">
              This is the content for Zone 2. You can customize this section as needed.
            </p>
          </div>
        );
      case 'zone3':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zone 3</h2>
            <p className="text-gray-600">
              This is the content for Zone 3. You can customize this section as needed.
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SARA</h2>
            <p className="text-gray-600">
              Please select a zone from the navigation menu above.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {renderZoneContent()}
    </div>
  );
}