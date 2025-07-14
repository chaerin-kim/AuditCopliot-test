'use client';

export default function NotesAppPage() {
  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <iframe
        src="https://react-notes-app.vercel.app/"
        className="w-full h-full border-0"
        title="Notes App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}
