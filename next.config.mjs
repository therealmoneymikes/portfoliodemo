/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**", //glob pattern syntax
        //multiple segments /main/images = ** (nested and non-nested)
        //signle segment /main = *
        //ACg8ocLGFbyM4v... Unique Identifier
        //s96-c = 96 pixel compression
      },
    ],
  },
};

export default nextConfig;
