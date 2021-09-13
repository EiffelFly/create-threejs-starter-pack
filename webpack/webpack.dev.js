const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const ip = require("internal-ip");
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
    
    // Open the browser after server had been started
    open: true, 

    https: false,
    allowedHosts: "all",
    client: {
      overlay: true, 
    },
    

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
