const SERVER_PROXY = ` 
  server: {
    proxy: {
      '/api': {
        target: 'http://',
        changeOrigin: true,
        ws: true,
        rewrite: (pathStr) => pathStr.replace('^/api', '/')
      },
    },
  },`

module.exports = {
  SERVER_PROXY,
}
