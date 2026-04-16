import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lenis'],
    },
    async rewrites() {
        return [
            {
                source: '/api/admin/:path*',
                destination: `${BACKEND}/api/admin/:path*`,
            },
            {
                source: '/api/users/:path*',
                destination: `${BACKEND}/api/users/:path*`,
            },
            {
                source: '/api/chat/:path*',
                destination: `${BACKEND}/api/chat/:path*`,
            },
            {
                source: '/api/topics/:path*',
                destination: `${BACKEND}/api/topics/:path*`,
            },
            {
                source: '/api/topics',
                destination: `${BACKEND}/api/topics`,
            },
            {
                source: '/api/payments/:path*',
                destination: `${BACKEND}/api/payments/:path*`,
            },
        ]
    },
}

export default nextConfig;
