const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/js/main.js",
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "dist"),
    },
    experiments: {
        topLevelAwait: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/index.html" },
                { from: "src/main.css" },
                { from: "src/favicon.ico" },
                { from: "src/json", to: "json" },
            ]
        })
    ],
}