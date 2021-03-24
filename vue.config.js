const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    // options...\
    devServer: {
        disableHostCheck: true
    },
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
}