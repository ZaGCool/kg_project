import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        searchTitle: "搜索",
        hash: "", // 当前播放歌曲的hash值
        currentSongLists: [] // 当前播放歌曲的所在列表
    },
    mutations: {
        changeSearchTitle(state, { title }) {
            state.searchTitle = title;
        },
        getSongs(state, { hash }) {
            state.hash = hash;
        },
        commitSongLists(state, { list }) {
            state.currentSongLists = list;
        }
    },
    actions: {},
    modules: {}
})