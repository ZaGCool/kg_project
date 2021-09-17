<template>
  <div class="nav_search">
    <mt-header :title="searchTitle" :style="bool?styleObj1:styleObj2">
      <span slot="left" @touchend="$router.back()">
        <!--   go_back内部小图标颜色自动加成了外层的mt-header的color -->
        <mt-button icon="back" class="go_back" ></mt-button>
      </span>
      <mt-button  slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import { mapState} from 'vuex';
export default {
  computed:{
    ...mapState(['searchTitle'])
  },
  data(){
    return {
      // color: "#000",
      bool: true,
      styleObj1:{
        color: "#000",
        background: "#fff",
        "box-shadow":'1px 1px 2px #ccc'
      },
      styleObj2:{
        color: "#fff",
        background: "linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%)",
        "box-shadow":'none'
      }
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler(to){
        if(to.path=='/search'){
          this.$store.commit('changeSearchTitle',{title: '搜索'})
        }
        console.log(to);
        // 根据路由做了颜色判断 
        if(to.name==='songdetails'){
          this.bool = false;
        }else {
          this.bool =true;
        }
      }
    }
  }
  
};
</script>

<style lang="less">

.nav_search {
  &>.mint-header {
    background-color: transparent;
    height: 2.3rem;
    // .mint-header-title {
    //   // color: #fff;
    // }
    // .go_back {
    //   color: #000;
    // }
  }
  
}
</style>