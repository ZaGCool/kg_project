一、webpack解决跨域方式
   1 webpack-dev-server开发服务器中 proxy选项中设置跨域代理
     在脚手架 如果想要去修改或者配置 webpack 可以去新建一个vue.config.js 
     
   2  前端模式数据 before 

二、项目说明
  1 基于vue-cli4搭建的  less  +  UI组件库 mint-ui （移动端配合vue的不错的UI组件库）
    vuex +  vue-router + axios
  2 通过git来做版本控制

  3 项目目录清空

  4 axios 安装并导入了 挂到了原型上 this.$axios访问

  5 gitee 推送一下

  6 样式初始化 
     base.css 基本的样式重置  共用的样式
    
     适配rem  借助vw 

     基于iphone5  320px == 100vw   1vw: 3.2px
     20px / 3.2  = 6.25vw
  
  7.基础结构搭建

  8. mintUi 组件库的使用
    npm i  mint-ui -S 
    按需引入
    1 配置插件 npm install babel-plugin-component -D
    2 配置.babelrc
    
    3 使用组件 导入即可

  9. 头部区域完成

  10. Nav组件
      NavSearch
      Search 
      
      调整了一下样式

  11.新歌数据请求 渲染 轮播图 以及歌曲

  12、排行 歌单  歌手（歌手组件 歌手组件）  听书 组件 完成

  ========今日内容=====
  排行---歌曲详情组件 SongDetails
  歌单---歌曲详情组件

  歌手列表---点击任何一个歌手 ====》歌手详情组件 SingerInfo

  听书组件====》 点击任何一个小说===》听书详情组件
       

  结构化思考： 

      |-- 酷狗header头部区域
      |
      |                                    |---新歌导航
  App |----------nav命令视图------Nav.vue-- | ---排行导航
                      ｜                    | ---歌单导航
                      ｜                    | ---歌手导航
                      ｜                    | ---听书导航
                      ｜
                      ｜ -------NavSearch.vue 搜索导航
      |
      |
      |----------默认视图 ---------NewSong----轮播图（swipe）--- cell新歌歌曲列表

      |----------默认视图 ---------Rank  ---- ｜
                                             ｜ ====> Cell组件 ====> SongDetails歌曲详情组件
      |----------默认视图 ---------Plist ---- ｜

      |----------默认视图 ---------Singer---- mintUI-cell歌手分类列表 
                                      |
                                      |====> SingerList 每个分类下的歌手列表组件
                                                 ｜
                                                 ｜====> SingerInfo 具体每个歌手的 详情组件 
                                                           
      |----------默认视图 ---------Radio听书组件-----> 听书详情组件radiodetails 


      |----------默认视图 ---------Search组件 


      ｜---独立的组件： 歌曲音乐播放器 底部----详情音乐播放器组件


=================================
安装最新版的nodejs

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


       
   