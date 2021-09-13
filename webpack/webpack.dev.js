const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");
const path = require("path");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: portFinderSync.getPort(8080),
    static: {
      directory: path.resolve(__dirname, "static"),
      watch: true,
    },
    https: false,
    allowedHosts: "all",
    client: {
      overlay: true,
    },
  },
});
