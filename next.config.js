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
        source: '/todo/:path*',
        destination: '/todo/:path*',
      },
      {
        source: '/auth-app/:path*',
        destination: '/apps/auth-app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
