import Vue from "vue";
import VueRouter from "vue-router";
// import {
//   parseFloat
// } from "core-js/fn/number";

const Home = () =>
  import( /* webpackChunkName:"Home" */ "../components/Home.vue");
const Found = () =>
  import( /* webpackChunkName:"Home" */ "../components/found/Found.vue");
const PlayList = () =>
  import( /* webpackChunkName:"Playlist" */ "../components/playlist/PlayList.vue");
const SongList = () =>
  import( /* webpackChunkName:"Playlist" */ "../components/songlist/SongList.vue");
const PlayMv = () =>
  import( /* webpackChunkName:"Mv" */ "../components/mv/PlayMv.vue");
const TopList = () =>
  import( /* webpackChunkName:"Playlist" */ "../components/toplist/TopList.vue");
const Mvs = () =>
  import( /* webpackChunkName:"Mv" */ "../components/mv/Mvs.vue");
const AllMv = () =>
  import( /* webpackChunkName:"Mv" */ "../components/mv/AllMv.vue");
const Search = () =>
  import( /* webpackChunkName:"Search" */ "../components/search/Search.vue");


Vue.use(VueRouter);


const routes = [{
    // 路由重定向
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: 'home',
    component: Home,
    redirect: "/found",
    children: [{
        path: "/found",
        component: Found
      },
      {
        path: "/playlist",
        component: PlayList
      }, {
        path: "/playlist/:id",
        component: SongList
      }, {
        path: "/toplist",
        component: TopList
      }, {
        path: "/mvs",
        component: Mvs
      }, {
        path: '/allmv',
        component: AllMv
      }, {
        path: '/search/:key',
        component: Search
      }
    ]
  },
  {
    path: "/mv/:id",
    component: PlayMv
  }
];

const router = new VueRouter({
  routes,
  // mode: 'history',
  // base: './', //加上这一行

});

export default router;

//格式化时间
Vue.filter('dataFormat', function (original) {
  const dt = new Date(original)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  // return `${y}-${m}-${d}`
})
