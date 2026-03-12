import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // <--- This tells Next.js to build the static 'out' folder for Capacitor
};

export default nextConfig;
