'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function NotesAppPage() {
  const { isSignedIn, user } = useUser();
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [messageSent, setMessageSent] = useState(false);

  // postMessage 전송 함수
  const sendAuthMessage = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow && isSignedIn && user) {
        // 직렬화 가능한 사용자 데이터만 추출
        const safeUserData = {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
          createdAt: user.createdAt?.toISOString(),
          updatedAt: user.updatedAt?.toISOString(),
        };

        // 다양한 형태의 메시지 전송 (직렬화 가능한 데이터만)
        const messages = [
          {
            type: 'CLERK_AUTH_STATE',
            payload: {
              isSignedIn: true,
              user: safeUserData,
            },
          },
          {
            type: 'AUTH_STATE_UPDATE',
            payload: {
              isLoggedIn: true,
              user: safeUserData,
            },
          },
          {
            type: 'CLERK_USER_DATA',
            user: safeUserData,
          },
        ];

        messages.forEach((message) => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              message,
              'https://supabase.clerk.app'
            );
          }
        });

        // 전역 변수로도 설정 시도 (직렬화 가능한 데이터만)
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'SET_GLOBAL_AUTH',
              payload: {
                clerkUser: safeUserData,
                isAuthenticated: true,
              },
            },
            'https://supabase.clerk.app'
          );
        }

        // 간단한 인증 토큰 형태로도 전송
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'AUTH_TOKEN',
              token: `clerk_${user.id}_${Date.now()}`,
              userId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
            },
            'https://supabase.clerk.app'
          );
        }

        // 기본 인증 상태만 전송
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'SIMPLE_AUTH',
              isLoggedIn: true,
              userId: user.id,
              userEmail: user.emailAddresses[0]?.emailAddress,
              userName: user.fullName,
            },
            'https://supabase.clerk.app'
          );
        }

        // 스크립트 주입으로 인증 정보 설정 시도
        try {
          if (iframe.contentDocument) {
            const script = iframe.contentDocument.createElement('script');
            script.textContent = `
              // 전역 변수로 인증 정보 설정 (직렬화 가능한 데이터만)
              window.clerkUser = ${JSON.stringify(safeUserData)};
              window.isAuthenticated = true;
              
              // Clerk 객체가 있다면 설정
              if (window.Clerk) {
                window.Clerk.user = ${JSON.stringify(safeUserData)};
                window.Clerk.isSignedIn = true;
              }
              
              // postMessage 리스너 추가
              window.addEventListener('message', function(event) {
                if (event.origin !== '${window.location.origin}') return;
                
                if (event.data.type === 'CLERK_AUTH_STATE') {
                  console.log('Clerk 인증 상태 수신:', event.data.payload);
                  window.clerkUser = event.data.payload.user;
                  window.isAuthenticated = event.data.payload.isSignedIn;
                  
                  // Clerk 객체 업데이트
                  if (window.Clerk) {
                    window.Clerk.user = event.data.payload.user;
                    window.Clerk.isSignedIn = event.data.payload.isSignedIn;
                  }
                }
              });
              
              console.log('인증 스크립트 주입 완료');
            `;
            iframe.contentDocument.head.appendChild(script);
          }
        } catch (scriptError) {
          console.log('스크립트 주입 실패 (CORS 제한):', scriptError);
        }

        setMessageSent(true);
        console.log('인증 메시지 전송 완료:', messages);
      }
    } catch (error) {
      console.log('iframe 메시지 전송 중 에러:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      // 초기 로드 시 메시지 전송
      const initialTimer = setTimeout(sendAuthMessage, 1000);

      // 주기적으로 메시지 재전송 (Todo 앱이 로드되는 동안)
      const intervalTimer = setInterval(sendAuthMessage, 3000);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(intervalTimer);
      };
    }
  }, [isSignedIn, user, iframeKey]);

  // iframe 로드 완료 시 메시지 전송
  const handleIframeLoad = () => {
    console.log('Clerk+Supabase Todo App 로드 완료');
    if (isSignedIn && user) {
      setTimeout(sendAuthMessage, 500);
    }
  };

  // URL 파라미터로 인증 정보 전달
  const getIframeSrc = () => {
    if (isSignedIn && user) {
      const params = new URLSearchParams({
        auth_user_id: user.id,
        auth_email: user.emailAddresses[0]?.emailAddress || '',
        auth_name: user.fullName || '',
        auth_source: 'parent_app',
        timestamp: Date.now().toString(),
      });
      return `https://supabase.clerk.app?${params.toString()}`;
    }
    return 'https://supabase.clerk.app';
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
    setMessageSent(false);
  };

  // 수동으로 메시지 전송하는 버튼
  const handleManualAuth = () => {
    sendAuthMessage();
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Todo 앱</h1>
            <p className="text-gray-600">
              Clerk+Supabase 기반 Todo 애플리케이션
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-800 font-medium">
                  로그인이 필요합니다
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                메인 앱에서 먼저 로그인해주세요.
              </p>
            </div>

            <Link
              href="/"
              className="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              메인 페이지로 이동하여 로그인
            </Link>
          </div>

          <div className="mt-6 text-center">
            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
              🔗 Clerk+Supabase Todo App과 연동
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 64px)' }} className="relative">
      {/* 상단 컨트롤 패널 */}
      <div className="absolute top-4 right-40 z-10 flex space-x-2">
        <button
          onClick={handleManualAuth}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
        >
          인증 전송
        </button>
      </div>

      {/* 사용자 정보 표시 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.firstName?.charAt(0) ||
                user?.emailAddresses[0]?.emailAddress?.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-gray-500">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          {messageSent && (
            <div className="mt-2 text-xs text-green-600">
              ✓ 인증 정보 전송됨
            </div>
          )}
        </div>
      </div>

      {/* iframe */}
      <iframe
        ref={iframeRef}
        key={iframeKey}
        src={getIframeSrc()}
        className="w-full h-full border-0"
        title="Clerk+Supabase Todo App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
        allow="camera; microphone; geolocation; payment"
        allowFullScreen
        onLoad={handleIframeLoad}
      />

      {/* 하단 정보 */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="text-xs text-gray-600">
            <p>
              🔗{' '}
              <a
                href="https://supabase.clerk.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Clerk+Supabase Todo App
              </a>
            </p>
            <p>📝 메인 앱 로그인 상태와 연동됨</p>
            <p>🔄 3초마다 인증 정보 재전송</p>
            <p>🔧 URL 파라미터 + postMessage + 스크립트 주입</p>
            <p>🛡️ 직렬화 안전 데이터만 전송</p>
            <p className="text-yellow-600 mt-1">
              💡 Todo 앱에서 로그인이 안 되면 "인증 전송" 버튼을 클릭하세요
            </p>
          </div>
        </div>
      </div>

      {/* 디버깅 정보 */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black bg-opacity-75 text-white rounded-lg p-2 text-xs">
          <p>🔍 디버깅 정보:</p>
          <p>User ID: {user?.id?.substring(0, 8)}...</p>
          <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
          <p>메시지 전송: {messageSent ? '✅' : '❌'}</p>
          <p>iframe 키: {iframeKey}</p>
        </div>
      </div>
    </div>
  );
}
