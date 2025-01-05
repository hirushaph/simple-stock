import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/public/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
