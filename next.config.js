// This file sets the default port for Next.js dev server to 3000
module.exports = {
  devIndicators: {
    port: 3000,
  },
  experimental: {
    serverComponentsExternalPackages: ['next-auth', '@auth/core'],
  },
};
