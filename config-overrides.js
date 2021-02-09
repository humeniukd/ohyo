const CircularDependencyPlugin = require('circular-dependency-plugin')
const { override, addWebpackPlugin } = require('customize-cra')
const { webpackRevolutOverrides, jestOverride } = require('@revolut/cra-overrides')

module.exports = {
  webpack: (config) => {
    config = webpackRevolutOverrides(config)

    return override(
      addWebpackPlugin(
        new CircularDependencyPlugin({
          cwd: process.cwd(),
          failOnError: true,
          include: /src/,
        }),
      ),
    )(config)
  },

  jest: (config) => {
    config = jestOverride(config)

    if (process.env.GENERATE_VISUAL_REPORT === 'true') {
      config.coverageReporters = ['lcov']
    }

    return config
  },
}
