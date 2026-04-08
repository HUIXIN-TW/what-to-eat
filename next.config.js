const nextConfig = {
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
