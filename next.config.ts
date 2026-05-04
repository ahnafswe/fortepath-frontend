import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	images: {
		remotePatterns: [
			{
				hostname: "cdn.jsdelivr.net",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/v1/auth/:path*",
				destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/:path*",
			},
			{
				source: "/api/v1/:path*",
				destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/:path*",
			},
		];
	},
};

export default nextConfig;
