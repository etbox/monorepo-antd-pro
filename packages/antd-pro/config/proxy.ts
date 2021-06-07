/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

const target = 'http://localhost:3000'

export default {
  dev: {
    '/api/': {
      target,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
