/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // 내부 앱 라우팅
      {
        source: '/weather-app/:path*',
        destination: '/apps/weather-app/:path*',
      },
      {
        source: '/notes-app/:path*',
        destination: '/apps/notes-app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
