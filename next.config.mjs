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
      {
        protocol: "https",
        hostname: "un7bugu2aifjw6dm.us-east4.gcp.endpoints.huggingface.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hq6hm46zpil5zwh5.us-east4.gcp.endpoints.huggingface.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gtll4aox1eqbmdq4.us-east4.gcp.endpoints.huggingface.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wgz35ns80csvwttw.us-east-1.aws.endpoints.huggingface.cloud",
        pathname: "/**",
      }
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
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' },
        ],
      },
    ]
  },
};

export default nextConfig;
