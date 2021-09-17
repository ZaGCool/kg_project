<template>
  <div class="nav">
    <mt-navbar v-model="selected">
      <mt-tab-item 
      :id="i" 
      v-for="(item,i) in navs" :key="i"
      @touchend.native="$router.push(item.path)"
      >
        {{item.meta.title}}
      </mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Navbar, TabItem } from "mint-ui";
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import navs from "../../router/navs.js";
export default {
  data(){
    return {
      navs,
      selected: 0
    }
  },
  // 监控路由信息对象 一旦hash路由发生变化 那么则seleted重新改一下
  watch:{
    $route:{
      handler(to){
        // console.log('嘿嘿嘿监控到路由变化了',to);
        this.selected = this.navs.findIndex(item=>item.path===to.path);
      },
      immediate: true
    }
  },
  methods:{
   
  }
};
</script>

<style>
 .nav .mint-tab-item-label {
   font-size: 14px;
 }
</style>