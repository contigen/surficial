import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: `3mb`,
    },
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: `https`,
    //     hostname: `nft-reverse-image-search.s3.eu-central-1.amazonaws.com`,
    //     port: ``,
    //     search: ``,
    //   },
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
