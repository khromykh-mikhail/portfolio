import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve("dist"),
    clean: true,
  },

  mode: "development",
  devtool: "source-map",

  devServer: {
    static: "./dist",
    open: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    // Main page
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    // Each project page
    ...[1, 2, 3, 4, 5].map(
      (i) =>
        new HtmlWebpackPlugin({
          template: `./src/project_${i}.html`,
          filename: `project_${i}.html`,
        })
    ),

    new CopyWebpackPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
};
