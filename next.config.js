/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/naver/:path*',
        destination: '/apps/naver/:path*',
      },
      {
        source: '/google/:path*',
        destination: '/apps/google/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
