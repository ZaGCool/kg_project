<template>
  <div class="search">
    <div class="search_box clearfix">
      <input type="text" placeholder="歌手/歌名/拼音" v-model="keyWord" @keyup.enter.exact="searchFn"> <button @touchend="searchFn">搜索</button>
    </div>
    <div class="hot" :hidden="!!searchLists.length">
      <p>最近热门</p>
      <mt-cell 
      v-for="item in hotLists"
      :key="item.sort"
      @touchend.native="searchFn(item.keyword)"
      :title="item.keyword"></mt-cell>
    </div>
    <div class="search_ret" v-show="searchLists.length">
      <p>共有{{total}}条结果</p>
      <mt-cell 
      v-for="item in searchLists"
      :key="item.hash"
      @touchend.native="getSongFn(item.hash)"
      :title="item.filename">
        <img slot="icon" src="../../assets/img/download_icon.png" width="15" height="15" class="fr">
      </mt-cell>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      hotLists: [],
      searchLists: [],
      keyWord: '',
      total: ""
    }
  },
  async created(){
     let result  = await this.$jsonp('http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp');
     console.log(result);
     this.hotLists = result.data.info;
  },
  methods: {
    async searchFn(words){
      // if(!this.keyWord) return;
      if(typeof words ==='string'){
         this.keyWord = words; // 给点击热词之后 添加给文本框的
      }else {
        if(!this.keyWord) return;  // 这个逻辑 给上面按钮单击 判断文本框是否为空
      }
     
      let res = await this.$jsonp('http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword='+ encodeURI(this.keyWord)  +'&page=1&pagesize=30')
      console.log(res);
      this.total = res.data.total;
      this.searchLists = res.data.info.map(item=>({hash:item.hash,filename:item.filename}))
    },
    getSongFn(hash){
      this.$store.commit('getSongs',{hash});
      this.$store.commit('commitSongLists',{list:this.searchLists});
    }
  }
}
</script>

<style>
.search .search_box {
  margin: .65rem .5rem 0;
}
.search .search_box>* {
  float: left;
}
 .search .search_box input{
   border: 1px solid #e5e5e5;
   border-radius: .25rem;
   width: 11.85rem;
   line-height: 1.5rem;
   height: 1.5rem;
   text-indent: 1.5rem;
   background: url('../../assets/img/search_icon.png') .3rem -0.1rem  no-repeat;
   background-size: contain;
   margin-right: .45rem;
 }
 .search .search_box button {
     border:none;
     font-size: .7rem;
     outline: none;
     color: #959595;
     background-color: #e5e5e5;
     width: 2.6rem;
     height: 1.5rem;
     line-height: 1.5rem;
     border-radius: .25rem;
     text-align: center;
 }
.search .hot .mint-cell-text {
     font-size: .7rem;
     padding-left: .5rem;
 }
 .search .hot p {
   margin-top: 1rem;
   font-size: .6rem;
   color: #35a5f2;
   height: 30px;
   line-height: 30px;
   padding-left: 1rem;
 }
 .search .search_ret .mint-cell-text {
   font-size: .7rem;
 }
 .search .search_ret  p{
   background-color: #e6e6e6;
   font-size: .6rem;
   margin: .5rem 0;
   padding: .25rem 0;
   text-indent: 1rem;
 }
</style>