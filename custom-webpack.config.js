const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    "devServer": {
        "historyApiFallback": true,
        "proxy": {
          "/api": {
            "target" : "http://localhost:4200",
            "secure": false
          }
        }
      }
};