'use client';

import { useState, useEffect } from 'react';
import { useUser, SignIn, SignUp } from '@clerk/nextjs';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesAppPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      loadNotes();
    }
  }, [isSignedIn, user]);

  const loadNotes = () => {
    // 로컬 스토리지에서 노트 로드 (실제로는 API 호출)
    const savedNotes = localStorage.getItem(`notes_${user?.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  };

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem(`notes_${user?.id}`, JSON.stringify(newNotes));
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '새 노트',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (updatedNote: Note) => {
    const newNotes = notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date() }
        : note
    );
    saveNotes(newNotes);
    setCurrentNote(updatedNote);
  };

  const deleteNote = (noteId: string) => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    saveNotes(newNotes);
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
      setIsEditing(false);
    }
  };

  const selectNote = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(false);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">노트 앱</h1>
          <p className="text-gray-600 text-center mb-6">로그인이 필요합니다.</p>

          <div className="space-y-4">
            <button
              onClick={() => setShowSignIn(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              회원가입
            </button>
          </div>

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
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">노트 앱</h1>
            <div className="text-sm text-gray-500">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </div>
          </div>
          <button
            onClick={createNote}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            새 노트
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              노트가 없습니다.
            </div>
          ) : (
            <div className="p-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note)}
                  className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                    currentNote?.id === note.id
                      ? 'bg-blue-100 border-blue-300'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        {currentNote ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {isEditing ? '저장' : '편집'}
                  </button>
                  <button
                    onClick={() => deleteNote(currentNote.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(currentNote.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex-1 p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={currentNote.title}
                    onChange={(e) =>
                      updateNote({ ...currentNote, title: e.target.value })
                    }
                    className="w-full text-2xl font-bold border-none outline-none bg-transparent"
                    placeholder="제목을 입력하세요"
                  />
                  <textarea
                    value={currentNote.content}
                    onChange={(e) =>
                      updateNote({ ...currentNote, content: e.target.value })
                    }
                    className="w-full h-full border-none outline-none bg-transparent resize-none"
                    placeholder="내용을 입력하세요"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold mb-4">
                    {currentNote.title}
                  </h1>
                  <div className="prose max-w-none">
                    {currentNote.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">
                노트를 선택하거나 새 노트를 만들어보세요
              </p>
              <button
                onClick={createNote}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                새 노트 만들기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
