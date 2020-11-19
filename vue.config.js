module.exports = {
    devServer: {
        host:'localhost',
        port:"8080",
        https:false,
      // 设置代理
      proxy: {
        '/api': {//凡是遇到http://localhost:XXXX/api形式的路径，全部启用代理，作用就是筛选出数据请求和静态资源访问。可以自己定义：'/任意'（前后保持一致）
          target: 'http://ttapi.research.itcast.cn/', // 后端服务器域名
          ws: true, // 是否启用websockets
          changeOrigin: true,// 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite:{
            '^/api':''
          }
        }
      }
    }
  }