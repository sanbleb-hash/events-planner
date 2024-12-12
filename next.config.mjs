/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'media.istockphoto.com',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com/',
			},
		],
	},
};

export default nextConfig;
