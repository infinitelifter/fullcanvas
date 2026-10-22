/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicit rather than implicit: every canonical, sitemap entry and internal
  // link is written without a trailing slash, so pin the behaviour that makes
  // them agree. Changing this later would invalidate canonicals.
  trailingSlash: false,
};

export default nextConfig;
