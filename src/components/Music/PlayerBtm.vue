<template>
  <div class="music clearfix"
   v-show="hash"
   @touchend="isPlayerDetailShow = true">
    <img width="53" height="53" :src="imgUrl | imgFilter" alt="" />
    <audio ref="myAudio" :src="aduioDataUrl"></audio>
    <div class="info">
      <h3>{{ songName }}</h3>
      <p>{{ singerName }}</p>
    </div>
    <div class="control fr">
      <i
        @touchend.stop="playOrPauseFn"
        :class="['iconfont', isPlay ? 'icon-pause' : 'icon-play']"
      ></i>
      <em class="iconfont icon-skipnext" @touchend.stop="nextFn"></em>
      <b class="iconfont icon-download"></b>
    </div>
    <!-- 音乐详情 -->
    <play-detail
      :imgUrl="imgUrl"
      :songName="songName"
      v-show="isPlayerDetailShow"
      v-bind:isShow.sync="isPlayerDetailShow"
      :geciText="geciText"
      :is-play="isPlay"
      @play-or-pause-fn="playOrPauseFn"
      @next-fn="nextFn"
      :total-time="totalTime"
      @prev-fn="prevFn"
    ></play-detail>
  </div>
</template>

<script>
import playDetail from "./PlayerDetail";
import { mapState } from "vuex";
/* 
/api/v1/song/get_song_info_v2?hash=930EB2CA8E8338086B1C65A630B03AF6&mid=fa81c597301d2d04cddc9317b710db11
*/
export default {
  components: {
    playDetail,
  },
  data() {
    return {
      isPlayerDetailShow: false,
      imgUrl: "",
      singerName: "",
      songName: "",
      aduioDataUrl: "",
      isPlay: false,
      geciText: "",
      totalTime: "",
    };
  },
  watch: {
    hash: {
      async handler(hash) {
        console.log("hash变化了 换歌曲了", hash);
        if (!hash) return;
        let {
          data: { data },
        } = await this.$axios.get(
          "/api/v1/song/get_song_info_v2?hash=" +
            hash +
            "&mid=fa81c597301d2d04cddc9317b710db11"
        );
        console.log(data);
        this.imgUrl = data.imgUrl;
        this.singerName = data.singerName;
        this.songName = data.songName;
        this.aduioDataUrl = data.url;

        this.$refs.myAudio.addEventListener("canplay", () => {
          this.$refs.myAudio.play();
          this.isPlay = true;
          let totalTime = this.$refs.myAudio.duration;
          let zero = (m) => (m < 10 ? "0" + m : m);
          this.totalTime =
            zero(parseInt(totalTime / 60)) +
            ":" +
            zero(parseInt(totalTime % 60));
        });

        // 发起另一个请求请求歌曲的歌词
        let { data: geci } = await this.$axios.get(
          "/app/i/krc.php?cmd=100&hash=" + hash + "&timelength=247000"
        );

        // console.log(geci);
        let arr = geci.split("[").filter((item) => item.charAt(0) == "0");
        this.geciText = '';
        arr.forEach((item) => {
          this.geciText += `
           <p class="${item.split("]")[0].slice(0, -3)}">${
            item.split("]")[1]
          }</p>
           `;
        });
        // console.log(this.geciText);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(["hash", "currentSongLists"]),
  },
  methods: {
    playOrPauseFn() {
      // 想要播放音频 必须控制 audio 原生dom
      console.log(this.$refs.myAudio);
      if (this.$refs.myAudio.paused) {
        // 暂停
        this.$refs.myAudio.play();
      } else {
        this.$refs.myAudio.pause();
      }
      this.isPlay = !this.$refs.myAudio.paused;
    },
    nextFn() {
      let curIdx = this.currentSongLists.findIndex(
        (item) => item.hash === this.hash
      );
      if (curIdx + 1 < this.currentSongLists.length) {
        this.$store.commit("getSongs", {
          hash: this.currentSongLists[curIdx + 1].hash,
        });
      } else {
        console.log("已经是最后一首了");
      }
    },
    prevFn() {
      let curIdx = this.currentSongLists.findIndex(
        (item) => item.hash === this.hash
      );
      if (curIdx - 1 >= 0) {
        this.$store.commit("getSongs", {
          hash: this.currentSongLists[curIdx - 1].hash,
        });
      } else {
        console.log("已经是第一首了");
      }
    },
  },
};
</script>

<style lang="less">
.music {
  position: fixed;
  padding: 0.15rem;
  z-index: 1005;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  & > * {
    float: left;
  }
  & > img {
    border-radius: 0.3rem;
  }
  .info {
    padding-top: 0.6rem;
    padding-left: 0.35rem;
    width: 140px;
    overflow: hidden;
    h3 {
      font-size: 0.6rem;
    }
    p {
      font-size: 0.5rem;
      color: #727272;
    }
  }
  .control {
    padding-top: 0.65rem;
    .iconfont {
      font-size: 1.25rem;
    }
    em {
      margin: 0 0.5rem;
    }
    b {
      margin-right: 0.65rem;
    }
  }
}
</style>