import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { learningStages } from './lib/learning-stages';

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  async redirects() {
    return learningStages.flatMap(stage => stage.classIds.filter(id => id !== stage.id).map(id => ({
      source: `/classes/${id}`,
      destination: `/classes/${stage.id}#${id}`,
      permanent: true,
    })));
  },
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
