const withTypeScriptGraphQL = require('./with-typescript-graphql')

module.exports = withTypeScriptGraphQL({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  }
})
