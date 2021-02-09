module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        scriptsPackageName: 'react-scripts',
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register',
  ],

  webpackFinal: (config) => {
    const scopePluginIndex = config.resolve.plugins.findIndex(
      ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
    )

    // See https://github.com/storybookjs/storybook/issues/9514#issuecomment-679350377
    config.resolve.plugins.splice(scopePluginIndex, 1)

    return config
  },
}
