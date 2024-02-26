
/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ["minio.grovyo.xyz", "dt46iilh1kepb.cloudfront.net", "dn3w8358m09e7.cloudfront.net"]
	},
	/* config options here */
}

export default nextConfig