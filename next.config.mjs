import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
 
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fkmywxxthxwsyjqngcgn.supabase.co",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8787",
  },
};

export default nextConfig;
