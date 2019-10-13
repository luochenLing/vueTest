module.exports={
    // node: {
    //     dns: 'mock',
    //     net: 'mock'
    // },
    devServer: {
        open: true,//自动打开浏览器
        port: 3001,//运行端口号
        contentBase: 'src',//指定跟目录
        hot: true,//启用热更新
        //openPage: '/vue_index.html'//设置默认启动页面
    },
}