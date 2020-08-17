import Vue from "vue";
import VueRouter from "vue-router";

const Home = () =>
  import( /* webpackChunkName:"Home" */ "../components/Home.vue");
const Found = () =>
  import( /* webpackChunkName:"Home" */ "../components/found/Found.vue");
const SongList = () =>
  import( /* webpackChunkName:"Home" */ "../components/songlist/SongList.vue");
const PlayMv = () =>
  import( /* webpackChunkName:"Home" */ "../components/mv/PlayMv.vue");
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
    }, {
      path: "/playlist/:id",
      component: SongList
    }, ]
  },
  {
    path: "/mv/:id",
    component: PlayMv
  }
];

const router = new VueRouter({
  routes
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
