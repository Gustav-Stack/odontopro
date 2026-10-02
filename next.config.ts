import type { NextConfig } from "next";
import path from 'path'
const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
       
      },{
        protocol: "https", 
        hostname: "res.cloudinary.com",

      },{
        protocol: "https", 
        hostname: "lh3.googleusercontent.com",

      }
    ],
  },

  turbopack: {
  root: path.resolve(__dirname),  
  },
};

export default nextConfig;