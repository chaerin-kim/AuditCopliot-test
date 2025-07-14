'use client';

export default function WeatherAppPage() {
  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <iframe
        src="https://weather-app-react-tau.vercel.app/"
        className="w-full h-full border-0"
        title="Weather App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        allow="geolocation"
      />
    </div>
  );
}
