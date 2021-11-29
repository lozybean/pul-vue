// vue.config.js
module.exports = {
  assetsDir: "static/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8181", //源地址
        changeOrigin: true, //是否跨域

        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
