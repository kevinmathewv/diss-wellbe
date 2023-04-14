const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wellbe.github.io/'
    : '/',
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugins.delete('eslint');
  },
});
