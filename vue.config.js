// 覆盖和修改 添加 webpack相关配置
// 处理跨域 devServer
module.exports = {
    devServer: { // dev-server 底层用的express（nodejs服务器）
        // 启动开发服务器 去向后端请求数据之前 会经过这个before钩子函数
        // 利用webpack 模拟数据
        // before(app) { //app 服务器实例
        //     app.get('/user', (req, res) => {
        //         let list = [{
        //                 name: "zs",
        //                 age: 22
        //             },
        //             {
        //                 name: "wa",
        //                 age: 33
        //             }
        //         ]
        //         res.json(list)
        //     })
        // }
        proxy: { // 代理转发
            // https://m.kugou.com/api/?json=true 
            // https://m.kugou.com/?json=true 
            "^/api": {
                target: "https://m.kugou.com",
                secure: false, // 是否只允许https协议访问 http也可以跨域访问
                changeOrigin: true, // 是否请求跨域 
                pathRewrite: {
                    "/api": ""
                }
            }
        }
    },
    lintOnSave: false // 关闭掉eslint

}