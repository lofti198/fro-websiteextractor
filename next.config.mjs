import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "websiteextractor.net",
      },
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
      {
        protocol: "https",
        hostname: "blog-rpd-3cy6.ue1.rapydapps.cloud",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
