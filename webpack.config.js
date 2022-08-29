const glob = require('glob');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const list = {};
(async function makeList(dirPath, list) {
  const filesPath = glob.sync(`${dirPath}/**/index.js`);
  for (let filePath of filesPath) {
    const fileName = filePath.split(/\//).slice(2).join('/').replace(/(?<=index)\.js/, '');
    list[`${fileName}`] = `./${filePath}`;
  }
  return list;
})("packages/lib", list);
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env'
          ]
        }
      }
    },
    pre
  ].filter(Boolean);
}

module.exports = {
  entry: list,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    assetModuleFilename: 'media/[contenthash:10][ext][query]',
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'packages'),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, 'node_modules/.cache/eslintcache'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',// 单入口默认 main
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", {
                plugins: [
                  "preset-default",
                  "prefixIds",
                  {
                    name: "sortAttrs",
                    params: {
                      xmlnsOrder: "alphabetical"
                    }
                  }
                ]
              }]
            ]
          }
        }
      }),
    ],
  },
  module: {
    rules:
      [
        {
          test: /.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        {
          oneOf: [
            {
              test: /\.css$/,
              use: getStyleLoader()
            },
            {
              test: /\.s[ac]ss$/,
              use: getStyleLoader("sass-loader"),
            },
            {
              test: /\.(png|jpe?g|gif|webp|svg)$/i,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024
                }
              },
            },
            {
              test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    // 开启缓存
                    cacheDirectory: true,
                    // 关闭缓存文件的压缩
                    cacheCompression: false,
                    // 减少 babel 代码体积
                    plugins: [
                      "@babel/plugin-transform-runtime"
                    ]
                  }
                }
              ]
            },
          ]
        }
      ]
  },
  mode: 'production',
}