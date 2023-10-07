const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remoteDomain = process.env.REMOTE_APP ?? 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com'
            }
        ]
    },
    reactStrictMode: true,
    webpack(config, { isServer }) {
        if (!isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'host',
                    remotes: {
                        admin: `internal ${require.resolve('./delegate-module.js')}?remote=admin@${remoteDomain}/remoteEntry.js`,
                    },
                    filename: 'static/chunks/remote.js',
                }),
            );
        }

        return config;
    }
}

module.exports = nextConfig
