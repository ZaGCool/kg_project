<template>
  <div class="radio">
    <div class="top clearfix">
      <img :src="imgUrl" alt="">
      <div class="info">
        <h3>{{albumname}}</h3>
        <p>主播:{{singer}}</p>
      </div>
      <p>共{{total}}个节目</p>
    </div>
    <div class="btm">
        <mt-cell
        v-for="item in radioLists" 
        :title="item.title" 
        :label="item.time"
        @touchend.native="getSongFn(item.hash)"
        :key="item.hash">
          <img slot="icon" @touchend.prevent="popUpFn" src="../../assets/img/download_icon.png" width="15" height="15" class="fr">
        </mt-cell>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  props:['radioId'],
  data(){
    return {
      imgUrl: "",
      singer:"",
      total: "",
      albumname: "",
      radioLists: []
    }
  },
  created: async function(){
    let { data:{albuminfo:data}} = await this.$axios.get('/radio/info/'+this.radioId+"?json=true")
    console.log(data);
    this.imgUrl = data.info.img;
    this.total = data.info.total;
    this.singer = data.info.singer;
    this.albumname = data.info.albumname;
    this.radioLists = data.info.list.map(item=>{
      return {
        hash: item.hash,
        title:item.filename_str,
        time:item.timelength_str
      }
    })
  },
  methods: {
    popUpFn(){
      MessageBox.confirm("下载需要手机酷狗客户端支持。", '').catch(e=>{})
    },
    getSongFn(hash){
      this.$store.commit('getSongs',{hash});
      this.$store.commit('commitSongLists',{list:this.radioLists});
    }
  }
}
</script>

<style lang="less">
  .radio {

    .top {
     height: 8.75rem;
      overflow: hidden;
      &>* {
        float: left;
      }
      img {
        margin: .75rem;
        border-radius: .65rem;
      }
      div.info {
         color: #333333;
        h3 {
          margin: 1.6rem 0 1.65rem;
          
          font-size: .7rem;
         
        }
        p {
          font-size: 12px;
        }
      }
      &>p {
        width:100%;
        padding-left: .9rem;
        font-size:.7rem;
        font-weight: bold;
      }
    }
   
    .mint-cell {
      margin: 5px 0;
    }
    .mint-cell-title img {
      position: relative;
      top: 12px;
    }
    .mint-cell-text {
      font-size: 12px;
    }
    .mint-cell-label {
      padding-left: 15px;
      background: url('../../assets/img/icon_time.png')left center no-repeat;
      background-size: 10px 10px;
    }
  }
</style>