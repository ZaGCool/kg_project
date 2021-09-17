<template>
  <div>
    <Cell-com :lists="radioLists" com-name="radio">
      <template #default="{count}">
        <span class="playCount">
          <img  width="13" src="../../assets/img/icon_music.png" />
          {{count}}
        </span>
      </template>
    </Cell-com>
  </div>
</template>

<script>
import CellCom from '../Common/Cell'
export default {
  components:{
    CellCom
  },
  data(){
    return {
      radioLists: []
    }
  },
  created:async function(){

    let {data} = await this.$axios.get('/radio/index?json=true')
    console.log(data);
    this.radioLists = data.albumlist.list.list.map(item=>{
      return {
        play_count: item.play_count,
        album_name: item.album_name,
        album_id: item.album_id,
        sizable_cover: item.sizable_cover
      }
    })
  }
}
</script>

<style lang="less">
.playCount {
    position: absolute;
    left: 5rem;
    top: 2.75rem;
    color: #333333;
    font-size: .65rem;
     img {
       position: relative;
       top: -0.1rem;
     }
  }
</style>