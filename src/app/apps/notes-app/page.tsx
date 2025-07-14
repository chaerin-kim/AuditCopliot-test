'use client';

export default function ClerkAppPage() {
  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <iframe
        src="https://supabase.clerk.app/"
        className="w-full h-full border-0"
        title="Clerk + Supabase Todo App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}
