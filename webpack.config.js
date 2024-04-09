const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'spin.js',
        library: 'spin'
    },
    optimization: {
        minimize: false
    },
    resolve: {
        fallback: {
          "fs": false,
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert/"),
          "zlib": require.resolve("browserify-zlib"),
          "constants": require.resolve("constants-browserify"),
          "util": require.resolve("util/"),
          "crypto": require.resolve("crypto-browserify"),
          "vm": require.resolve("vm-browserify")
        }
    },
};
