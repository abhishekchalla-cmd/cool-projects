const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "main.js",
  },
};
