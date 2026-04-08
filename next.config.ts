import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Generate /tutorials/introduction/index.html instead of .html
  // so GitHub Pages serves clean URLs without a server
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
