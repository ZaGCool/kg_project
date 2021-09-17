// 五个导航的路由规则
import NewSong from '@/views/NewSong/NewSong'
import Rank from '@/views/Rank/Rank'
import Plist from '@/views/Plist/Plist'
import Singer from '@/views/Singer/Singer'
import Radio from '@/views/Radio/Radio'

import Nav from '@/components/Nav/Nav'

let nav_routes = [{
        path: "/",
        name: "newsong",
        meta: {
            title: "新歌"
        },
        components: {
            default: NewSong,
            nav: Nav
        }
    },
    {
        path: "/rank",
        name: "rank",
        meta: {
            title: "排行"
        },
        components: {
            default: Rank,
            nav: Nav
        }
    },
    {
        path: "/plist",
        name: "plist",
        meta: {
            title: "歌单"
        },
        components: {
            default: Plist,
            nav: Nav
        }
    },
    {
        path: "/singer",
        name: "singer",
        meta: {
            title: "歌手"
        },
        components: {
            default: Singer,
            nav: Nav
        }
    },
    {
        path: "/radio",
        name: "radio",
        meta: {
            title: "听书"
        },
        components: {
            default: Radio,
            nav: Nav
        }
    }

];

export default nav_routes;