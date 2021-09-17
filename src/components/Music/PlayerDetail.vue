<template>
  <div class="playDetails" v-show="false">
    <!-- 整个详情播放组件中 底部的模糊的大图片 -->
    <div
      class="btmMask"
      :style="{
        background:
          'url(' +
          imgUrl.replace(/{size}/, '400') +
          ')center top no-repeat, #000',
        backgroundSize: 'cover',
      }"
    ></div>
    <div class="topMask">
      <!-- 头部 -->
      <mt-header :title="songName">
        <span slot="left">
          <mt-button
            icon="back"
            @touchend.native.stop="$emit('update:isShow', false)"
          ></mt-button>
        </span>
      </mt-header>
      <img :src="imgUrl | imgFilter" alt="" width="180" />
      <!-- 歌词区域 -->
      <div class="geci">
        <div class="wrapper" ref="wrapper" v-html="geciText"></div>
      </div>
      <!-- 控制条 -->
      <div class="controler clearfix">
        <!-- 当前时间 audio.currentTime   -->
        <span>{{ ct }}</span>
        <!-- 播放槽 -->
        <div class="bar" ref="bar">
          <!-- rec滑块 -->
          <div class="rec" v-drag="audio" ref="rec"></div>
        </div>
        <span>{{ totalTime }}</span>
      </div>
      <div class="controler2">
        <img
          @touchend="$emit('prev-fn')"
          src="../../assets/img/play_prev.png"
          width="35"
          alt=""
        />
        <img
          @touchend="$emit('play-or-pause-fn')"
          :src="isPlay ? img1 : img2"
          width="50"
          alt=""
        />
        <img
          @touchend="$emit('next-fn')"
          src="../../assets/img/play_next.png"
          width="35"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    songName: String,
    geciText: String,
    isPlay: Boolean,
    totalTime: {
      type: String,
      default: "00:00",
    },
  },
  directives: {
    drag: {
      // 水平拖拽 （限制x范围）
      inserted(el, binding) {
        console.log(binding);
        let audio = binding.value;
        el.addEventListener("touchstart", (e) => {
          var startX = e.touches[0].clientX - el.offsetLeft;
          let fn = (e) => {
            let moveX = e.touches[0].clientX;
            let cha = moveX - startX;
            // 范围限制
            cha = cha < 0 ? 0 : cha;
            // console.log(this.$refs.bar.offsetWidth);
            cha =
              cha > el.parentNode.offsetWidth ? el.parentNode.offsetWidth : cha;

            el.style.left = cha + "px";

            // 音频要调节播放进度
            let currentTime =(el.offsetLeft / el.parentNode.offsetWidth) * audio.duration;
            // 以下处理方式 是为了更好的切换音频的播放轨道 
            if ("fastSeek" in audio) {
              // 让当前 歌曲在指定位置开始播放 （方法的时候安全可靠的）
              audio.fastSeek(currentTime);
            } else if (audio.seekable) {
              //
              //  直接把当前的时间赋给 audio音频对象的属性currentTime
              audio.currentTime = currentTime;
            } else {
              //    把当前的音频的播放时间 放置在 最大音频缓冲区的位置
              audio.currentTime = audio.buffered.end(audio.buffered.length - 1);
            }
          };
          document.addEventListener("touchmove", fn);
          document.addEventListener("touchend", () => {
            document.removeEventListener("touchmove", fn);
          });
        });
      },
    },
  },
  created() {
    this.audio.addEventListener("timeupdate", () => {
      console.log(this.audio.currentTime);
      let zero = (m) => (m < 10 ? "0" + m : m);
      this.ct =
        zero(parseInt(this.audio.currentTime / 60)) +
        ":" +
        zero(parseInt(this.audio.currentTime % 60));

      // 随着歌曲不断播放  应该让rec走

      let scale = this.audio.currentTime / this.audio.duration;

      this.$refs.rec.style.left = scale * this.$refs.bar.offsetWidth + "px";

      // 歌词滚动效果
      var allP = this.$refs.wrapper.children;
      for(var i = 0; i < allP.length; i++){
        if(allP[i].className == this.ct){
            for(var j = 0;j<allP.length;j++){
              if(j<=i){
                 allP[j].style.color = 'orange';
              }else {
                 allP[j].style.color = '#fff';
              }
            }
         this.$refs.wrapper.style.top = "-25"*i + 'px';
        }
       
      }
      
    });
  },
  data() {
    return {
      ct: "",
      audio: this.$parent.$refs.myAudio,
      img1: require("../../assets/img/play_pause.png"),
      img2: require("../../assets/img/play_play.png"),
    };
  },
};
</script>

<style lang="less">
.music .playDetails {
  margin: 0 !important;
  // background:url("http://singerimg.kugou.com/uploadpic/softhead/200/20200415/20200415123511158355.jpg"),#000;
  // background-size: cover;
  height: 26.4rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  overflow: hidden;
}
.music .playDetails .btmMask {
  width: 150%;
  height: 150%;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  z-index: 1;
  // 过滤： blur模糊
  filter: blur(15px);
  -webkit-filter: blur(15px);
}
.music .playDetails .topMask {
  z-index: 2;
  position: relative;
}
.geci {
  height: 4.75rem;
  line-height: 1.25rem;
  overflow: hidden;
  margin: 0.5rem;
  position: relative;
  .wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 1.75rem;
    transition: all 0.5s;
    font-size: 0.6rem;
  }
}
.controler > * {
  float: left;
}
.controler {
  margin: 1rem auto;
  span {
    font-size: 0.6rem;
    &:nth-child(1) {
      margin-left: 0.75rem;
    }
  }
  .bar {
    margin: 0 0.25rem;
    width: 11rem;
    height: 0.1rem;
    background-color: #666;
    position: relative;
    top: 0.35rem;
    .rec {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: skyblue;
      position: absolute;
      left: 0;
      top: -0.2rem;
    }
  }
}
.controler2 img {
  margin: 0 0.5rem;
}

.playDetails {
  .mint-header {
    background-color: transparent;
    color: #fff;
    .mint-button-icon {
      .mintui-back {
        color: rgb(134, 134, 134);
        font-size: 1rem;
      }
    }
  }
  & > img {
    margin-top: 1rem;
  }
}
</style>