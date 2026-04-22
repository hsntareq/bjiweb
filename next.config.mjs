/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['next-auth', '@auth/core'],
  },
};

export default nextConfig;
