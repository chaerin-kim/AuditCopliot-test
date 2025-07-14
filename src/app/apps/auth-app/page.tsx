'use client';

import { useEffect, useState, useRef } from 'react';

export default function AuthAppPage() {
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow && iframe.contentDocument) {
          // WebAuthn 관련 API를 비활성화하는 스크립트 주입
          const script = iframe.contentDocument.createElement('script');
          script.textContent = `
            // WebAuthn API를 비활성화
            if (window.navigator.credentials) {
              const originalGet = window.navigator.credentials.get;
              window.navigator.credentials.get = function(options) {
                console.log('WebAuthn 비활성화됨 - 다른 인증 방식을 사용하세요');
                return Promise.reject(new Error('WebAuthn is disabled in iframe'));
              };
            }
            
            // WebAuthn 관련 에러 메시지 숨기기
            const originalError = console.error;
            console.error = function(...args) {
              if (args[0] && typeof args[0] === 'string' && args[0].includes('publickey-credentials-get')) {
                return; // WebAuthn 에러 무시
              }
              originalError.apply(console, args);
            };
            
            // 페이지 로드 완료 후 WebAuthn 관련 요소 숨기기
            setTimeout(() => {
              const webauthnElements = document.querySelectorAll('[data-provider="webauthn"], .webauthn-button, [data-testid="webauthn"]');
              webauthnElements.forEach(el => {
                el.style.display = 'none';
              });
            }, 2000);
          `;

          iframe.contentDocument.head.appendChild(script);
        }
      } catch (error) {
        console.log('iframe 스크립트 주입 중 에러:', error);
      }
    };

    // iframe이 로드된 후 스크립트 주입
    const timer = setTimeout(handleIframeLoad, 2000);
    return () => clearTimeout(timer);
  }, [iframeKey]);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)' }} className="relative">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={handleRefresh}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          새로고침
        </button>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
          이메일/비밀번호 로그인 사용
        </div>
      </div>

      <iframe
        ref={iframeRef}
        key={iframeKey}
        src="https://next-auth-example.vercel.app/"
        className="w-full h-full border-0"
        title="NextAuth.js Example App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
        allow="camera; microphone; geolocation; payment; publickey-credentials-get"
        allowFullScreen
        onLoad={() => {
          console.log('iframe 로드 완료');
        }}
      />
    </div>
  );
}
