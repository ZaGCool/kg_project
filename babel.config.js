module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        // 遇到那个报错  数组去掉一层
        ["component", {
            "libraryName": "mint-ui",
            "style": true
        }]
    ]
}