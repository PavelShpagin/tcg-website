// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
 
// initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "fkmywxxthxwsyjqngcgn.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "casters.cards",
        pathname: "/**",    
      },
      {
        protocol: "https",
        hostname: "gtll4aox1eqbmdq4.us-east4.gcp.endpoints.huggingface.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",  
        hostname: "n5ae8q97e483iws9.us-east-1.aws.endpoints.huggingface.cloud",
        pathname: "/**",
      },
    ],
    // loader: 'custom',
    // loaderFile: './imageLoader.ts',
  },
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8787",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    }
  },
};

export default nextConfig;
