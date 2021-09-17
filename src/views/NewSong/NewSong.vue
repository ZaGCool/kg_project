<template>
  <div id="new_song">
    <!-- 轮播图 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in bannerLists" :key="item.id">
        <img :src="item.imgurl" :title="item.title" :alt="item.title" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 单元格 新歌歌曲 -->
    <div>
          <mt-cell 
          @touchend.native="getSongFn(item.hash)"
        v-for="(item,i) in songsLists" :key="i"
        :title="item.filename"   >
          <img slot="icon" @touchend.prevent="popUpFn"  src="../../assets/img/download_icon.png" width="15" height="15" class="fr">
        </mt-cell>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Cell,MessageBox } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
export default {
  data() {
    return {
      // 轮播图数据
      bannerLists: [],
      // 新歌数据
      songsLists: [],
    };
  },
  created: async function () {

  
    let { data } = await this.$axios.get("/?json=true");

    this.bannerLists = data.banner.map((item) => {
      return {
        id: item.id,
        imgurl: item.imgurl,
        title: item.title,
      };
    });
    this.songsLists = data.data.map((item) => {
      return {
        filename: item.filename,
        hash: item.hash,
      };
    });
  },
  methods:{
    popUpFn(){
      MessageBox.confirm('下载需要手机酷狗客户端支持。').catch(err=>{})
    },
    // 获取歌曲
    getSongFn(hash){
      // 提交 当前的歌曲的信息 以及当前歌曲所在的列表

      this.$store.commit('getSongs',{ hash })
      this.$store.commit('commitSongLists', { list:this.songsLists })
    }
  }
};
</script>

<style lang="less">
#new_song {
  .mint-swipe {
    margin-top: 0.25rem;
    height: 6rem;
    .mint-swipe-item {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicators {
      bottom: 0rem;
      .mint-swipe-indicator {
        opacity: 0.4;
      }
    }
  }

  .mint-cell-text {
    font-size: .65rem;
    display: inline-block;
    width: 12.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>