module.exports = {
    configureWebpack: {
        //
        mode: "development"
    },
    // dev server
    devServer: {
        public: '0.0.0.0:8080',
        hot: true,
        disableHostCheck: true
    }
};
