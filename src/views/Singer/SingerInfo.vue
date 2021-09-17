<template>
  <div class="singerinfo">
    <div class="top">
      <img :src="imgurl | imgFilter" alt="" />
      <h3>{{ singerName }}</h3>
      <span>关注</span>
      <em>{{ listeners | numFilter }}亿人听过</em>
    </div>
    <div class="song_box">
      <div class="total">全部播放/{{songcount}}首</div>
      <mt-cell
        :title="item.songName"
        :label="item.singerName"
        v-for="item in songsLists"
        :key="item.hash"
        @touchend.native="getSongFn(item.hash)"
      ></mt-cell>
    </div>
  </div>
</template>

<script>
/* 
http://mobileservice.kugou.com/api/v3/singer/info?version=9999&plat=undefined&singername=%E9%99%88%E5%A5%95%E8%BF%85&singerid=420&format=jsonp&callback=JSONPCallback418966604502061

插件 vue-jsonp
*/
export default {
  props: ["singerId"],
  data() {
    return {
      listeners: "",
      songsLists: [],
      songcount: "",
      singerName: "",
      imgurl: "",
    };
  },
  filters: {
    numFilter(inp) {
      return (inp / 100000000).toFixed(2);
    },
  },
  created: async function () {
    // 下面这个axios请求 是用来获取主要的数据 （包含图片 歌手名字 歌手的歌曲 不包含听歌数量）
    let { data } = await this.$axios.get(
      "/singer/info/" + this.singerId + "?json=true"
    );
    console.log(data);
    this.songcount = data.info.songcount;
    this.singerName = data.info.singername;
    this.imgurl = data.info.imgurl;

    this.songsLists = data.songs.list.map((item) => {
      return {
        hash: item.hash,
        songName: item.filename.split(" - ")[1],
        singerName: item.filename.split(" - ")[0],
      };
    });

    // 下面的请求 playcount
    // 这个插件执行 返回promise对象
    let result = await this.$jsonp(
      "http://mobileservice.kugou.com/api/v3/singer/info?singerid=" +
        this.singerId +
        "&with_listener_index=1&format=jsonp"
    );
    console.log(result);
    this.listeners = result.data.year_listener;
  },
  methods: {
    getSongFn(hash){
      this.$store.commit('getSongs',{hash});
      this.$store.commit('commitSongLists',{list:this.songsLists})
    }
  }
};
</script>

<style lang="less">
.singerinfo {
  .top {
    width: 100%;
    // position: absolute;
    // top: -3rem;
    position: relative;
    margin-top: -7rem;
    z-index: 1000;
    overflow: hidden;
    img {
      width: 100%;
      height: 14rem;
    }
    & > * {
      color: white;
    }
    h3,
    span,
    em {
      position: absolute;
      left: 0.65rem;
    }
    h3 {
      top: 4.65rem;
      font-size: 1.05rem;
    }
    span {
      font-size: 0.55rem;
      text-align: center;
      line-height: 1.25rem;
      border-radius: 0.65rem;
      width: 2.45rem;
      height: 1.25rem;
      top: 6.4rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    em {
      top: 10.5rem;
      font-size: 0.55rem;
    }
  }
  .song_box {
    // position: absolute;
    position: relative;
    z-index: 1001;
    width: 100%;
    // top: 9.3rem;
    margin-top: -2.5rem;
    .total {
      height: 2.2rem;
      line-height: 2.2rem;
      background: url('../../assets/img/icon-play.png') .6rem center no-repeat, #fff;
      background-size: 1rem 1.05rem;
      padding-left: 1.75rem;
      font-size: .6rem;
      border-top-left-radius: .45rem;
      border-top-right-radius: .45rem;
    }
    .mint-cell-title {
      font-size: .6rem;
    }
    
  }
}
</style>