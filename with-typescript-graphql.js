function withTypeScriptGraphQL(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [
          options.defaultLoaders.babel,
          { loader: 'graphql-let/loader' },
        ],
      });

      config.module.rules.push({
        test: /\.graphqls$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      });
      config.module.rules.push({
        test: /\.graphqls$/,
        exclude: /node_modules/,
        use: ['graphql-let/schema/loader'],
      });

      if (nextConfig.webpack) {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
}

module.exports = withTypeScriptGraphQL;
