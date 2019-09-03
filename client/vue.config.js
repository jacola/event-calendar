//const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    mode: "development",
    devtool: false,
    plugins: [
      //new HardSourceWebpackPlugin(),
      //new BundleAnalyzerPlugin( {analyzerHost: '0.0.0.0', analyzerPort: 8081 })
    ],
    module: {
      rules: []
    }
  },
  // dev server
  devServer: {
    public: '0.0.0.0:80',
    // Needed for hot reloading when using a remote vps server
    disableHostCheck: true
  }
};
