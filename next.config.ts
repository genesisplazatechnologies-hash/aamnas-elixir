import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served from https://<user>.github.io/aamnas-elixir/ — GitHub Pages project subpath.
  basePath: "/aamnas-elixir",
  // Emit folder/index.html so GitHub Pages serves both /shop and /shop/.
  trailingSlash: true,
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
