import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入navs.js
import navs from './navs'

import NavSearch from '@/components/Nav/NavSearch'
import Search from '@/components/Search/Search'
import SingerList from '@/views/Singer/SingerList'
import SongDetails from '@/views/Common/SongDetails'
import RadioDetails from '@/views/Radio/RadioDetails'
import SingerInfo from '@/views/Singer/SingerInfo'

Vue.use(VueRouter)

// 解决路由重复点击的报错 vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

// 路由配置
// 五个路由 + 搜索
const routes = [
    ...navs,
    {
        path: "/search",
        name: "search",
        meta: {
            title: "搜索"
        },
        components: {
            default: Search,
            nav: NavSearch
        }
    },
    // 歌手列表组件
    {
        path: "/singerlist/:listId",
        name: "singerlist",
        props: {
            default: true
        },
        components: {
            nav: NavSearch,
            default: SingerList
        }
    },
    // 歌曲详情组件
    {
        path: "/songdetails/:comName/:detailsId",
        name: "songdetails",
        props: {
            default: true
        },
        components: {
            nav: NavSearch,
            default: SongDetails
        }
    },
    // 听书详情组件
    {
        path: "/radiodetails/:radioId",
        name: "radiodetails",
        props: {
            default: true
        },
        components: {
            nav: NavSearch,
            default: RadioDetails
        }
    },
    // 歌手详情信息组件
    {
        path: "/singerinfo/:singerId",
        props: true,
        name: "singerinfo",
        component: SingerInfo
    }
]

const router = new VueRouter({
    routes
})

export default router