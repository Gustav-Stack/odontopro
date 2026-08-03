import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  turbopack: {
    root: "C:\\Users\\gustavo\\Documents\\Gustavo\\Course\\Web development\\saas\\odontopro",
  },
};

export default nextConfig;