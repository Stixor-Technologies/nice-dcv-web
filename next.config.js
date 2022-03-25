/** @type {import('next').NextConfig} */

const { withGlobalCss } = require("next-global-css");

const withConfig = withGlobalCss();

const nextConfig = withConfig({
  reactStrictMode: true,
});

module.exports = nextConfig;
