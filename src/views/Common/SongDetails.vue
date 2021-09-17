<template>
  <div class="song_details">
    <div class="header">
      <img :src="imgUrl | imgFilter" alt="" />
      <div class="update_time" v-if="comName == 'rank'">上次更新时间：{{ updateTime }}</div>
      <!-- mask遮罩在上面 -->
      <div class="mask"></div>
    </div>
    <div class="con">
      <mt-cell
       @touchend.native="getSongFn(item.hash)"
       v-for="(item, i) in songsLists" :key="i" :title="item.filename">
        <img
          slot="icon"
          @touchend.prevent="popUpFn"
          src="../../assets/img/download_icon.png"
          width="15"
          height="15"
          class="fr"
        />
         <span v-show="comName == 'rank'" slot="icon" class="index_icon" :class="classArr[i]" width="24" height="24">{{i+1}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songsLists: [],
      updateTime: "",
      imgUrl: "",
      classArr: ['first','seconds','third']
    };
  },
  props: ["detailsId", "comName"],
  created: async function () {
    if (this.comName == "rank") {
      // 请求排行数据
      let { data } = await this.$axios.get(
        "/rank/info/" + this.detailsId + "?json=true"
      );
      this.imgUrl = data.info.imgurl;
      // 这里commit一个 用来修改navSearch的标题
      this.$store.commit("changeSearchTitle", { title: data.info.rankname });
      this.songsLists = data.songs.list.map((item) => {
        this.updateTime = item.addtime.split(" ")[0];
        return {
          filename: item.filename,
          hash: item.hash,
        };
      });
    }else if(this.comName ==  'plist') {
       let { data } = await this.$axios.get(
        "/plist/list/" + this.detailsId + "?json=true"
      );
      console.log(data);
      this.imgUrl = data.info.list.imgurl;
       this.$store.commit("changeSearchTitle", { title: data.info.list.specialname });

       this.songsLists = data.list.list.info.map(item=>{
         return {
           filename:item.filename,
           hash: item.hash
         }
       })
    }
  },
  methods: {
    getSongFn(hash){
      this.$store.commit('getSongs',{ hash })
      this.$store.commit('commitSongLists', { list:this.songsLists })
    }
  }
};
</script>

<style lang="less">
.song_details {
  
  .header {
    height: 14rem;
    position: relative;
    // position: absolute;
    left: 0;
    // top: 0;
   top: -2.5rem;
    img {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.4) 20%,
        rgba(0, 0, 0, 0) 30%,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 0.4) 80%,
        rgba(0, 0, 0, 0.9) 100%
      );
    }
    .update_time {
      position: absolute;
      left: .5rem;
      top: 9.5rem;
      font-size: .7rem;
      color: white;
    }
  }
  .con {
    width: 100%;
    margin-top: -2.5rem;
    // position: absolute;
    // left: 0;
    // top: 11.25rem;

    .mint-cell {
      .mint-cell-text {
        font-size: .7rem;
      }

      .index_icon {
        border-radius: .4rem;
        width: 1.05rem;
        height: .75rem;
        display: inline-block;
        color: #999999;
        text-align: center;
        line-height: .75rem;
        font-size: .6rem;
      }
      .first {
        background-color: red;
        color: white;
      }
      .seconds {
        background-color: #fd7222;
        color: white;
      }
      .third {
        background-color: #f7b22a;
        color: white;
      }
    }
  }
}
</style>