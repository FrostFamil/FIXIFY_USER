const path = require('path')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const postcssUrlRebase = require('./postcssUrlRebase')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.css$/,
        enforce: 'pre',
        use: [
          {
            options: {
              plugins: () => [
                require('stylelint'),
              ],
            },
            loader: require.resolve('postcss-loader'),
          },
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import'),
                require('postcss-url')({
                  url: postcssUrlRebase,
                }),
                require('postcss-cssnext')({
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
}
