var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    configureWebpack: {
        //
        mode: "development",
        devtool: false,
        plugins: [
          new HardSourceWebpackPlugin()
        ]
    },
    // dev server
    devServer: {
        public: '0.0.0.0:8080',
        hot: true,
        disableHostCheck: true
    }
};
