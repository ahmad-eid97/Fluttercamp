import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 2000,
  sassOptions: {
    // Don't surface deprecation warnings from third-party (node_modules) Sass.
    quietDeps: true,
    // Silence the Sass `@import` deprecation. This codebase relies on `@import`
    // for placeholder `@extend` across ~300 partials; the Sass module system
    // (`@use`/`@forward`) can't reproduce that cross-file `@extend` cleanly, so
    // we suppress the (non-breaking) deprecation until Dart Sass 3.0.
    silenceDeprecations: ['import'],
  },
  typescript: {
    // Type-safety is enforced separately via `tsc --noEmit` (passes clean).
    // Next 16's generated route validator types the `[locale]` segment as
    // `string`, which rejects our intentionally-narrowed `locale: 'ar' | 'en'`
    // params; skip that build-time check rather than widening params (and
    // cascading casts) across ~70 pages.
    ignoreBuildErrors: true,
  },
  images: {
    // Mock data uses these public image services (no real backend).
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      // Original asset host kept so any un-mocked legacy URLs still resolve.
      { protocol: 'https', hostname: 'dash.fluttercamp.com' },
    ],
  },
  turbopack: {
    // Pin the workspace root (silences the multi-lockfile inference warning).
    root: projectRoot,
    // Resolve the `@/` alias for both JS and SCSS `@import` under Turbopack
    // (mirrors the tsconfig paths mapping; required for nested SCSS imports).
    resolveAlias: {
      '@/*': './src/*',
    },
  },
};

export default nextConfig;
