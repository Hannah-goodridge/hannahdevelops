import type { NextConfig } from "next";
import withMDX from '@next/mdx';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    experimental: {
      mdxRs: true,
    },
    webpack: (config: any) => {
        config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
        config.resolve.alias['@svgs'] = path.join(__dirname, 'src/assets/svgs'); // Example
        // SVGR loader for SVG imports as React components
        config.module.rules.push({
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {},
            },
          ],
        });
        // Add more aliases as needed
        return config;
      },
};

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDXConfig(nextConfig);
