<template>
  <div class="rank">
      <Cell-com :lists="rankLists" com-name="rank"></Cell-com>
  </div>
</template>

<script>
import CellCom from '../Common/Cell'
export default {
  data(){
    return {
      rankLists: []
    }
  },
  components:{
    CellCom
  },
  created: async function(){
   let {data} =  await this.$axios('/rank/list?json=true');

   console.log(data);
   this.rankLists = data.rank.list.map(item=>{
     return {
       imgurl: item.imgurl,
       rankname: item.rankname,
       rankid: item.rankid
     }
   })
  }
}
</script>

<style lang="less">
 
</style>