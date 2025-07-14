'use client';

import { useState } from 'react';

export default function GoogleDrivePage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files = [
    {
      id: 1,
      name: '프로젝트 계획서.docx',
      type: 'document',
      size: '2.3 MB',
      modified: '2024-01-15',
      icon: '📄',
    },
    {
      id: 2,
      name: '디자인 가이드.pdf',
      type: 'pdf',
      size: '5.1 MB',
      modified: '2024-01-14',
      icon: '📋',
    },
    {
      id: 3,
      name: '프로젝트 이미지',
      type: 'folder',
      size: '15.2 MB',
      modified: '2024-01-13',
      icon: '📁',
    },
    {
      id: 4,
      name: '발표 자료.pptx',
      type: 'presentation',
      size: '8.7 MB',
      modified: '2024-01-12',
      icon: '📊',
    },
    {
      id: 5,
      name: '코드 파일',
      type: 'folder',
      size: '3.4 MB',
      modified: '2024-01-11',
      icon: '📁',
    },
  ];

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'text-blue-600';
      case 'pdf':
        return 'text-red-600';
      case 'folder':
        return 'text-yellow-600';
      case 'presentation':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">구글 드라이브</h2>

        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            새로 만들기
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            업로드
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            공유
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedFile === file.name
                  ? 'bg-red-50 border-red-300'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedFile(file.name)}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{file.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className={getFileTypeColor(file.type)}>
                  {file.type === 'document' && '문서'}
                  {file.type === 'pdf' && 'PDF'}
                  {file.type === 'folder' && '폴더'}
                  {file.type === 'presentation' && '프레젠테이션'}
                </span>
                <span>{file.modified}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            파일 정보
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">파일명:</span>
              <p className="font-medium">{selectedFile}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">크기:</span>
              <p className="font-medium">
                {files.find((f) => f.name === selectedFile)?.size}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">수정일:</span>
              <p className="font-medium">
                {files.find((f) => f.name === selectedFile)?.modified}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                다운로드
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                공유
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">저장 공간</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">사용된 공간</span>
            <span className="font-medium">34.7 MB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: '15%' }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">15GB 중 15% 사용</p>
        </div>
      </div>
    </div>
  );
}
