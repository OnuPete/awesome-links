function withTypeScriptGraphQL(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      });

      config.module.rules.push({
        test: /\.graphqls$/,
        exclude: /node_modules/,
        use: [
          { loader: 'graphql-tag/loader' },
          { loader: 'graphql-let/schema/loader' },
        ],
      });

      if (nextConfig.webpack) {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
}

module.exports = withTypeScriptGraphQL;
