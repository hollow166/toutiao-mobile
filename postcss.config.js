//postcss 的配置文件
module.exports = {
    plugins: {
    //     //自动添加浏览器厂商前缀，兼容不同浏览器
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*'],
      },
    },
  };