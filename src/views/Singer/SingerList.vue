<template>
  <div class="singerlist">
    <!-- 这是一个歌手列表组件 -->
    <mt-cell
     v-for="(item) in singerLists"
     :to="{name:'singerinfo',params:{singerId:item.singerid}}"
     :key="item.singerid"
      :title="item.singername">
      <img slot="icon" :src="item.imgurl | imgFilter" width="50" height="50">
    </mt-cell>
  </div>
</template>

<script>
export default {
  props:{
    listId:{
      type: Number | String
    }
  },
  data(){
    return {
      singerLists: []
    }
  },
  created: async function(){
    let {data}  = await this.$axios.get(`/singer/list/${this.listId}?json=true`);

    console.log(data);
    this.singerLists = data.singers.list.info.map(item=>{
      return {
        singerid:item.singerid,
        singername: item.singername,
        imgurl:item.imgurl
      }
    })
    // 这里更改一下vuex中的searchTitle 改为
    this.$store.commit('changeSearchTitle',{title: data.classname})
  }
}
</script>

<style>
  .singerlist .mint-cell-title {
    margin: .5rem 0;
  }
  .singerlist .mint-cell-title .mint-cell-text {
    font-size: .7rem;
    position: relative;
    left: .4rem;
    top: -0.3rem;

  }
</style>