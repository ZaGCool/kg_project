<template>
  <div class="cell">
    <mt-cell :title="titleName(item)" 
     :to="jumpObj(item)"
     
     v-for="(item,i) in lists" :key="i">
     <!-- item.rankid||item.specialid||item.album_id -->
     <!-- 默认插槽 播放数量 -->
      <slot :count="item.playcount || item.play_count"></slot>
      <img class="right_icon" src="../../assets/img/arrow_icon.png" width="12" height="12"/>
      <!-- <img slot="icon" class="music_img" :src="imgUrl(item.imgurl)" width="75" height="75"> -->
      <img slot="icon" class="music_img" :src="(item.imgurl|| item.sizable_cover) | imgFilter" width="75" height="75">
    </mt-cell>
  </div>
</template>

<script>

export default {
  props:{
    lists: {
      type:Array,
      require:true
    },
    comName:String
  },
  data(){
    return {
      
    }
  },
  // 设置一个计算属性 用来处理标题
  computed:{
    titleName(){
      return function(item){
        if(item.rankname) {
          return item.rankname;
        }else if(item.specialname){
          return item.specialname
        }else if(item.album_name){
          return item.album_name
        }
      }
    },
    jumpObj(){
      
      return (item)=>{
        if(this.comName == 'radio'){
          return {name:"radiodetails",params:{radioId: item.album_id}}
        }else {
           return {name:'songdetails',params:{
       detailsId:item.rankid||item.specialid||item.album_id,
       comName:this.comName}}
        }
       
      }
    },
    
    // 这是计算属性的处理方式
    // imgUrl(){
    //   return (url)=>{
    //     console.log(url);
    //     return url.replace(/{size}/,'400')
    //   }
    // }
  },
  
  // 关于渲染歌曲的标题的处理 方式: 可以判断item.rankname 存在为真 则用 否则用specialname
  
 
}
</script>

<style>
  .cell .mint-cell-text {
    width: 9rem;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cell .music_img {
    margin: .5rem 0;
  }
  .cell .mint-cell-text {
    font-size: .65rem;
    position: relative;
    top: -1rem;
    left: .5rem;

  }
  
</style>