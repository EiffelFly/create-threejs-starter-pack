const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const ip = require("internal-ip");
const portFinderSync = require("portfinder-sync");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: portFinderSync.getPort(8080),

    // Only useful when serving static file
    contentBase: "./dist",

    // When enable, file changes will trigger full page reload
    watchContentBase: true,

    // Open the browser after server had been started
    open: true,

    https: false,
    useLocalIp: true,
    disableHostCheck: true,
    // This will only show compiler error, if you want to show warnings as well:
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
    overlay: true,

    // Tells dev-server to supress messages like the webpack bundle information
    noInfo: true,

    // Provides the ability to execute custom middleware after all other middleware internally within the server.
    // after: function (app, server, compiler) {
    //   const port = server.options.port;
    //   const https = server.options.https ? "s" : "";
    //   const localIp = ip.v4.sync();
    //   // const domain1 = `http${https}://${localIp}:${port}`;
    //   // const domain2 = `http${https}://localhost:${port}`;
    // },
  },
});
