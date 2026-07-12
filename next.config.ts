import type { NextConfig } from "next";

/**
 * On GitHub Pages the site is served from a subpath
 * (https://<user>.github.io/<repo>/), not from the domain root. The deploy
 * workflow sets NEXT_PUBLIC_BASE_PATH to "/<repo>"; locally it is empty, so
 * `npm run dev` still serves from "/".
 *
 * Note this only prefixes what Next controls (the _next bundle, next/link,
 * next/image). Raw asset URLs written by hand — the clips and posters — have to
 * prefix themselves; see `asset()` in src/lib/basePath.ts.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static: there is no backend, so the whole site pre-renders to HTML
  // and can be dropped on any static host.
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
