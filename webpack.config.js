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

    ...[1, 2, 3, 4, 5].map(
      (i) =>
        new HtmlWebpackPlugin({
          template: `./src/project_${i}.html`,
          filename: `project_${i}.html`,
        })
    ),

    // Copy all static assets (images, etc.)
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets", to: "assets" },
        { from: "./src/styles", to: "styles" },
        { from: "./src/scripts", to: "scripts" },
      ],
    }),
  ],
};
