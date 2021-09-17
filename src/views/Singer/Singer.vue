<template>
  <div class="singer">
    <mt-cell
      v-for="(item,i) in singerLists"
      :key="item.classid"
      :title="item.classname"
      @touchend.native="goToSingerListFn(item.classid)"
      is-link
      :class="{'margin1': !isHasMarginFn(item.classname,i),'isBorder':isHasMarginFn(item.classname,i)}"
      >
    </mt-cell>

  </div>
</template>

<script>
export default {
  data(){
    return {
      singerLists: []
    }
  },
  created: async function(){
    let {data} = await this.$axios.get('/singer/class?json=true');

    console.log(data);
    this.singerLists = data.list;

  },
  methods:{
    isHasMarginFn(name,i){
      // 逻辑 当前项的名字 去和 前一项的名字 做对比 如果前两字相同 那么当前的这个项 不用加margin类
      // 反之 需要让当前这一项添加margin类
      return this.singerLists[i-1]&&this.singerLists[i-1].classname.includes(name.substring(0,2));
    },
    // 跳转到歌手列表组件
    goToSingerListFn(id){
      // 发起api方式跳转
      // 小坑： path 和 params 分开一起用
      this.$router.push({name:'singerlist',params:{listId:id}})
    }
  }
}
</script>

<style>
  .singer .mint-cell {
    border-radius: .4rem;
    margin: 0 .5rem;
    height: 2.05rem;
    border: 1px solid #e4e4e4;
    background-color: #fbfbfb;
    
  }
  .singer .mint-cell-text {
    font-size: .65rem;
  }
  .singer .mint-cell-allow-right::after {
    width: .4rem;
    height: .4rem;
    border-right-width: 1px;
  }
  .singer .margin1 {
    margin-top: .5rem !important;
  }
  .singer .isBorder {
    border-top: none !important;
  }
  
</style>