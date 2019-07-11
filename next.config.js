const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const { exportPathMap } = require('nextjs-export-path-map');
const withCSS  = require('@zeit/next-css');

module.exports = {
  distDir: 'build',
  ...withTypescript(
    withCSS({
      webpack: function (config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        })
        return config
      },
      exportPathMap: exportPathMap.bind(null, path.join(__dirname, 'pages'))
    })
  ),
}
