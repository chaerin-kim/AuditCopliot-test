'use client';

import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function TodoAppPage() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [showDirectLink, setShowDirectLink] = useState(false);
  const [authToken, setAuthToken] = useState<string>('');

  // Clerk 토큰 가져오기
  useEffect(() => {
    const getAuthToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          setAuthToken(token || '');
          console.log('Clerk 토큰 획득:', token?.substring(0, 20) + '...');
        } catch (error) {
          console.error('토큰 획득 실패:', error);
        }
      }
    };

    getAuthToken();
  }, [isSignedIn, getToken]);

  // 인증된 URL 생성
  const getAuthenticatedUrl = () => {
    if (!authToken) return 'https://supabase.clerk.app';

    // URL 파라미터로 토큰 전달
    const url = new URL('https://supabase.clerk.app');
    url.searchParams.set('clerk_token', authToken);
    url.searchParams.set('auth_source', 'sara_main_app');
    url.searchParams.set('user_id', user?.id || '');
    url.searchParams.set(
      'user_email',
      user?.emailAddresses[0]?.emailAddress || ''
    );

    return url.toString();
  };

  // postMessage 전송 함수 (개선된 버전)
  const sendAuthMessage = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow && isSignedIn && user && authToken) {
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

        // Clerk 토큰과 함께 전송
        const authMessages = [
          {
            type: 'CLERK_AUTH_TOKEN',
            token: authToken,
            user: safeUserData,
            source: 'sara_main_app',
          },
          {
            type: 'AUTHENTICATE_USER',
            payload: {
              token: authToken,
              user: safeUserData,
              isAuthenticated: true,
            },
          },
          {
            type: 'SET_CLERK_SESSION',
            session: {
              token: authToken,
              userId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
            },
          },
        ];

        authMessages.forEach((message) => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              message,
              'https://supabase.clerk.app'
            );
          }
        });

        setMessageSent(true);
        console.log('인증 토큰 전송 완료');
      }
    } catch (error) {
      console.log('iframe 메시지 전송 중 에러:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user && authToken) {
      // 토큰이 준비되면 메시지 전송
      const initialTimer = setTimeout(sendAuthMessage, 2000);
      const intervalTimer = setInterval(sendAuthMessage, 5000);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(intervalTimer);
      };
    }
  }, [isSignedIn, user, authToken, iframeKey]);

  const handleIframeLoad = () => {
    console.log('Clerk+Supabase Todo App 로드 완료');
    if (isSignedIn && user && authToken) {
      setTimeout(sendAuthMessage, 1000);
    }
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
    setMessageSent(false);
  };

  const handleManualAuth = () => {
    sendAuthMessage();
  };

  // 인증된 URL로 새 창에서 Todo 앱 열기
  const openTodoAppInNewWindow = () => {
    const authenticatedUrl = getAuthenticatedUrl();
    window.open(authenticatedUrl, '_blank', 'width=1200,height=800');
  };

  // 인증된 URL로 새 탭에서 Todo 앱 열기
  const openTodoAppInNewTab = () => {
    const authenticatedUrl = getAuthenticatedUrl();
    window.open(authenticatedUrl, '_blank');
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Todo 앱</h1>
            <p className="text-gray-600">Clerk+Supabase Todo App SSO 연결</p>
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
              className="block w-full text-center py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              메인 페이지로 이동하여 로그인
            </Link>
          </div>

          <div className="mt-6 text-center">
            <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
              🔗 Clerk+Supabase Todo App SSO 연결
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 64px)' }} className="relative">
      {/* 상단 컨트롤 패널 */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={handleRefresh}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          새로고침
        </button>
        <button
          onClick={handleManualAuth}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
        >
          토큰 전송
        </button>
        <button
          onClick={() => setShowDirectLink(!showDirectLink)}
          className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
        >
          직접 링크
        </button>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
          ✅ {user?.fullName}님으로 로그인됨
        </div>
      </div>

      {/* 직접 링크 패널 */}
      {showDirectLink && (
        <div className="absolute top-16 right-4 z-10 bg-white rounded-lg shadow-lg p-4 border min-w-64">
          <h3 className="font-medium text-gray-900 mb-3">
            인증된 Todo App 직접 접근
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            인증 토큰이 포함된 URL로 직접 접근합니다.
          </p>
          <div className="space-y-2">
            <button
              onClick={openTodoAppInNewWindow}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              🪟 새 창에서 열기 (인증됨)
            </button>
            <button
              onClick={openTodoAppInNewTab}
              className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              📑 새 탭에서 열기 (인증됨)
            </button>
            <a
              href={getAuthenticatedUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
            >
              🔗 인증된 직접 링크
            </a>
          </div>
          {authToken && (
            <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
              ✓ 인증 토큰 준비됨
            </div>
          )}
        </div>
      )}

      {/* 사용자 정보 표시 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
              ✓ 인증 토큰 전송됨
            </div>
          )}
          {authToken && (
            <div className="mt-1 text-xs text-blue-600">
              🔑 토큰: {authToken.substring(0, 10)}...
            </div>
          )}
        </div>
      </div>

      {/* iframe */}
      <iframe
        ref={iframeRef}
        key={iframeKey}
        src={getAuthenticatedUrl()}
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
            <p>🔐 SSO - 인증 토큰 공유</p>
            <p>🔄 5초마다 토큰 재전송</p>
            <p>🛡️ URL 파라미터 + postMessage</p>
            <p className="text-green-600 mt-1">
              💡 인증 토큰이 URL과 메시지로 전달됩니다
            </p>
          </div>
        </div>
      </div>

      {/* 디버깅 정보 */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black bg-opacity-75 text-white rounded-lg p-2 text-xs">
          <p>🔍 SSO 디버깅:</p>
          <p>User ID: {user?.id?.substring(0, 8)}...</p>
          <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
          <p>토큰 전송: {messageSent ? '✅' : '❌'}</p>
          <p>토큰 상태: {authToken ? '✅' : '⏳'}</p>
          <p>iframe 키: {iframeKey}</p>
        </div>
      </div>
    </div>
  );
}
