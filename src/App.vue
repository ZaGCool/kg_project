<template>
  <div id="app">
    <i class="iconfont icon-cart"></i>
    <header :style="{zIndex: zIdx}">
      <!-- 头部区域 -->
      <mt-header title="">
        <router-link to="/" slot="left">
          <mt-button class="logo"></mt-button>
        </router-link>
        <mt-button icon="search" slot="right"  @touchend.native="goToSearch"></mt-button>
      </mt-header>
      <!-- 命名视图 -->
      <router-view name="nav"></router-view>
    </header>
    <div class="container" :style="{'padding-bottom': hash?'3rem':'0'}">
      <!-- 默认视图 -->
      <router-view></router-view>
    </div>
    <!-- 底部音乐播放器 -->
    <player-btm></player-btm>
  </div>
</template>
<script>
import Vue from "vue";
import { Header, Button } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

import playerBtm from './components/Music/PlayerBtm'

import { mapState } from 'vuex'

export default {
  created() {
    // 测试 酷狗接口 数据能否获取成功
    // axios 请求
    // this.$axios.get('/api/?json=true') // 酷狗的首页新歌数据获取接口
    // // 产生了跨域
    // .then(data=>{
    //   console.log(data);
    // })
    // this.$axios.get('/user').then(data=>{
    //   console.log(data);
    // })
  },
  data(){
    return {
      zIdx: 999
    }
  },
  components:{
    playerBtm
  },
  computed:{
    ...mapState(['hash'])
  },
  methods:{
    // 跳转到search页面
    goToSearch(){
      this.$router.push('/search');
    }
  }
};
</script>
<style lang="less">
#app {
  &>header {
    position: fixed;
    width: 100%;
    z-index: 999;
    &>.mint-header {
      .is-left {
        a {
          .mint-button {
            width: 5.15rem;
            height: 1.25rem;
            background: url("./assets/img/logo.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .is-right {
        .mintui-search {
          font-size: 1.1rem;
        }
      }
    }
  }
  .container {
    padding-top: 4.3rem;
   
    // background-color:pink;
  }
}
</style>
