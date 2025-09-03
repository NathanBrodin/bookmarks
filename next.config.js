/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ui.shadcn.com',
      'tailwindcss.com',
      'github.com',
      'dribbble.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
}

module.exports = nextConfig
