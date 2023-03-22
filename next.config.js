/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ss.prestonator.com",
				port: "",
				pathname: "/uploads/**",
			},
		],
	},
};

module.exports = nextConfig
