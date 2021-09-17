<template>
  <div class="plist" ref="plist">
    <Cell-com :lists="plists" com-name="plist">
      <template #default="{ count }">
        <span class="playCount">
          <img width="13" src="../../assets/img/icon_music.png" />
          {{ count }}
        </span>
      </template>
    </Cell-com>
  </div>
</template>

<script>
import CellCom from "../Common/Cell";
export default {
  data() {
    return {
      plists: [],
      iPage: 1,
      onOff: false,
    };
  },
  components: {
    CellCom,
  },
  created: async function () {
    // 第一次发起的歌单请求
    // 后续 根据某个条件 触发 后续的请求
    let { data } = await this.$axios.get("/plist/index?page=1&json=true");
    this.plists = data.plist.list.info.map((item) => {
      return {
        imgurl: item.imgurl,
        specialname: item.specialname,
        specialid: item.specialid,
        playcount: item.playcount,
      };
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn);
  },
  beforeDestroy(){
    // 路由切换伴随着组件销毁和创建 从内存中移除这个事件绑定  
    window.removeEventListener('scroll',this.scrollFn);
  },
  methods: {
    scrollFn() {
      // 拿到内容高度
      let conH = this.$refs.plist.offsetHeight;
      console.log(conH);
      // 可视区域的高度
      let clientH = document.documentElement.clientHeight;
      // 滚动过的高度
      let iTop = document.documentElement.scrollTop;
      console.log(clientH);
      // console.log(this);
      if (iTop + clientH >= conH) {
        if (!this.onOff) {
          this.onOff = true;
          this.iPage++;
          this.$axios
            .get("/plist/index?page=" + this.iPage + "&json=true")
            .then(({data}) => {
              console.log(data);
              let newArr =data.plist.list.info.map((item) => {
                return {
                  imgurl: item.imgurl,
                  specialname: item.specialname,
                  specialid: item.specialid,
                  playcount: item.playcount,
                };
              });
              console.log(newArr);
              this.plists = this.plists.concat(newArr);
              this.$nextTick(function(){  // 异步dom更新之后触发
                this.onOff= false;
              })
            });
        }
      }
    },
  },
};
</script>

<style lang="less">
.playCount {
  position: absolute;
  left: 5rem;
  top: 2.75rem;
  color: #333333;
  font-size: 0.65rem;
  img {
    position: relative;
    top: -0.1rem;
  }
}
</style>