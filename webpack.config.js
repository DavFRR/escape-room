const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    escapeRoom: './src/js/escape-room.js',
    room2: './src/js/room-2.js',
    room3: './src/js/room-3.js',
    room35: './src/js/room-3.5.js',
    room4: './src/js/room-4.js',
    room45: './src/js/room-4.5.js',
    room5: './src/js/room-5.js',
    room6: './src/js/room-6.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
    assetModuleFilename: (pathData) => {
      if (pathData.filename.includes('freaky-sonic.mp4')) {
        return 'assets/freaky-sonic.mp4';
      }
      if (pathData.filename.includes('room2.png')) {
        return 'assets/room2.png';
      }
      return 'assets/[name][ext]';
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/escape-room.html',
      filename: 'escape-room.html',
      chunks: ['escapeRoom']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-2.html',
      filename: 'room-2.html',
      chunks: ['room2']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-3.html',
      filename: 'room-3.html',
      chunks: ['room3']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-3.5.html',
      filename: 'room-3.5.html',
      chunks: ['room35']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-4.html',
      filename: 'room-4.html',
      chunks: ['room4']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-4.5.html',
      filename: 'room-4.5.html',
      chunks: ['room45']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-5.html',
      filename: 'room-5.html',
      chunks: ['room5']
    }),
    new HtmlWebpackPlugin({
      template: './src/room-6.html',
      filename: 'room-6.html',
      chunks: ['room6']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/freaky-sonic.mp4',
          to: 'assets/freaky-sonic.mp4',
        },
        {
          from: 'src/assets/happy-cat.gif',
          to: 'assets/happy-cat.gif',
        },
        {
          from: 'src/assets/cat_tail_wiggle.png',
          to: 'assets/cat_tail_wiggle.png',
        },
        {
          from: 'src/assets/room2.png',
          to: 'assets/room2.png',
        },
        {
          from: 'src/assets/room3.5.png',
          to: 'assets/room3.5.png',
        },
        {
          from: 'src/assets/room4.5.png',
          to: 'assets/room4.5.png',
        },
      ],
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3002,
    historyApiFallback: {
      rewrites: [
        { from: /\/escape-room/, to: '/escape-room.html' },
        { from: /\/room-2/, to: '/room-2.html' },
        { from: /\/room-3/, to: '/room-3.html' },
        { from: /\/room-3.5/, to: '/room-3.5.html' },
        { from: /\/room-4/, to: '/room-4.html' },
        { from: /\/room-4.5/, to: '/room-4.5.html' },
        { from: /\/room-5/, to: '/room-5.html' },
        { from: /\/room-6/, to: '/room-6.html' },
        { from: /\//, to: '/index.html' },
      ],
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\]node_modules[\\]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}