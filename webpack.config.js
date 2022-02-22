const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve("src", "script.ts"),
  output: {
    path: path.resolve("dist"),
    filename: "script[hash].js",
  },
  devServer: {
    static: {
      directory: path.resolve("src"),
    },
    port: 2000,
    client: {
      logging: "none",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve("src", "index.html") }),
  ],
};
