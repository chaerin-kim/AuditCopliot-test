'use client';

import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const currentZone = searchParams.get('zone') || 'zone1';

  const renderZoneContent = () => {
    switch (currentZone) {
      case 'zone1':
        return (

          <iframe
            src="http://localhost:3000"
            className="w-full h-full border-0"
            allow="fullscreen"
            width="100%"
            height="100%" />

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
