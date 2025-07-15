'use client';

import { useUser, SignIn, SignUp, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 영역 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">SARA - 통합 앱 플랫폼</h1>
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <div className="text-sm text-gray-600">
                    안녕하세요, <span className="font-medium">{user?.fullName}</span>님!
                  </div>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    회원가입
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            다양한 웹 애플리케이션을 하나의 플랫폼에서 사용하세요
          </h2>
          <p className="text-xl text-gray-600">
            통합 로그인으로 모든 앱을 편리하게 이용하세요
          </p>
        </div>

        {/* 로그인 상태 표시 */}
        {isSignedIn && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">
                로그인됨 - 모든 앱에서 동일한 계정으로 사용 가능
              </span>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              날씨 앱
            </h3>
            <p className="text-gray-600 mb-4">
              실시간 날씨 정보를 확인할 수 있는 React 애플리케이션입니다.
            </p>
            <Link
              href="/weather-app"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              날씨 앱 사용하기
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Todo 앱
              </h3>
              {isSignedIn && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  멀티존
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4">
              Clerk+Supabase Todo App을 멀티존으로 연결합니다.
              {isSignedIn && (
                <span className="block text-sm text-green-600 mt-2">
                  메인 앱의 로그인 상태를 외부 Todo 앱에 전달합니다.
                </span>
              )}
            </p>
            <Link
              href="/todo"
              className={`inline-block px-4 py-2 rounded-md transition-colors ${
                isSignedIn 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              {isSignedIn ? 'Todo 앱 사용하기' : '로그인 후 사용 가능'}
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              인증 앱
            </h3>
            <p className="text-gray-600 mb-4">
              Clerk을 사용한 인증 시스템 예제 애플리케이션입니다.
            </p>
            <Link
              href="/auth-app"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              인증 앱 사용하기
            </Link>
          </div>
        </div>

        {/* 사용자 정보 (로그인 시에만 표시) */}
        {isSignedIn && (
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">계정 정보</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>이름:</strong> {user?.fullName}</p>
                <p><strong>이메일:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
              </div>
              <div>
                <p><strong>가입일:</strong> {user?.createdAt?.toLocaleDateString('ko-KR')}</p>
                <p><strong>계정 ID:</strong> {user?.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 로그인 모달 */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">로그인</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <SignIn />
          </div>
        </div>
      )}

      {/* 회원가입 모달 */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">회원가입</h2>
              <button
                onClick={() => setShowSignUp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
}
