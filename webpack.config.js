/**
 * @file
 * @author Tomáš Chochola <tomaschochola@tomaschochola.cz>
 * @copyright © 2026 Tomáš Chochola <tomaschochola@tomaschochola.cz>
 *
 * @license CC-BY-ND-4.0
 *
 * @see {@link https://creativecommons.org/licenses/by-nd/4.0/} License
 * @see {@link https://github.com/tomaschochola} GitHub Profile
 * @see {@link https://github.com/sponsors/tomaschochola} GitHub Sponsors
 */

import { WebpackConfigBuilder } from '@tomaschochola/tooling-webpack';

// eslint-disable-next-line no-restricted-exports
export default function (env = {}, argv = {}) {
  let tooling = new WebpackConfigBuilder({
    env,
    argv,
  });

  const appEnv = tooling.appEnv;
  const appName = tooling.appName;
  const appVersion = tooling.appVersion;
  const otlpApiKey = env.OTLP_API_KEY ?? process.env.OTLP_API_KEY ?? '';
  const webpackMode = tooling.webpackMode;

  tooling = tooling
    .setEntries({
      index: ['./storybook/index.ts', './storybook/index.scss'],
    })
    .addBabelLoader()
    .addStyleLoaders()
    .addHtmlLoader()
    .addAssetQueryRules()
    .addDefinePlugin({
      'process.env.APP_ENV': JSON.stringify(appEnv),
      'process.env.APP_NAME': JSON.stringify(appName),
      'process.env.APP_VERSION': JSON.stringify(appVersion),
      'process.env.OTLP_API_KEY': JSON.stringify(otlpApiKey),
      'process.env.WEBPACK_MODE': JSON.stringify(webpackMode),
    })
    .addHtmlPlugin({
      template: './storybook/index.html',
      filename: 'index.html',
    })
    .addPublicCopyPlugin()
    .addTerserMinimizer()
    .addCssMinimizer()
    .addHtmlMinimizer()
    .addJsonMinimizer()
    .addImageMinimizer();

  if (tooling.isProductionMode) {
    tooling = tooling
      .addGzipCompressionPlugin()
      .addBrotliCompressionPlugin()
      .addWorkboxServiceWorkerPlugin();
  }

  const config = tooling.toConfig();

  if (appEnv === 'playwright') {
    config.devServer = {
      ...config.devServer,
      client: false,
      hot: false,
      liveReload: false,
      webSocketServer: false,
    };
  }

  return config;
}
