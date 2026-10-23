/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images are pre-optimised by scripts/optimize-images.py, so Next's optimiser stays off.
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        // File names carry a content hash, so they never change in place.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/icon.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
