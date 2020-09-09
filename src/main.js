import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import TopBar from "../src/components/module/TopBar.vue";
import NavMenu from "../src/components/module/NavMenu.vue";
import PlayMusic from "../src/components/module/PlayMusic.vue";

//导入过滤器方法
import * as playCount from '../src/components/module/playCount.js'
Object.keys(playCount).forEach(key => {
  Vue.filter(key, playCount[key])
})

import {
  Container
} from "element-ui";
import {
  Header
} from "element-ui";
import {
  Input
} from "element-ui";
import {
  Aside
} from "element-ui";
import {
  Menu
} from "element-ui";
import {
  MenuItem
} from "element-ui";
import {
  Dialog
} from "element-ui";
import {
  Button
} from "element-ui";
import {
  Main
} from "element-ui";
import {
  Tabs
} from "element-ui";
import {
  Table
} from "element-ui";
import {
  TableColumn
} from "element-ui";
import {
  Slider
} from "element-ui";
import {
  TabPane
} from "element-ui";
import {
  Tooltip
} from "element-ui";
import {
  Footer
} from "element-ui";
import {
  Carousel
} from "element-ui";
import {
  CarouselItem
} from "element-ui";

import "element-ui/lib/theme-chalk/index.css";


//手动配置elemunt-ui
// import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Container);
Vue.use(Header);
Vue.use(Input);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Main);
Vue.use(Tabs);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Slider);
Vue.use(TabPane);
Vue.use(Tooltip);
Vue.use(Footer);
Vue.use(CarouselItem);
Vue.use(Carousel);



//bus总线
import VueBus from "vue-bus";
Vue.use(VueBus);

//封装全局组件
Vue.component("top-bar", TopBar);
Vue.component("nav-menu", NavMenu);
Vue.component("play-music", PlayMusic);



//全局css样式
import "../src/assets/css/gloabl.css";

//导入font图标

import "../src/assets/fonts/iconfont.css";

//asiox
import axios from "axios";
//配置请求的根路径

axios.defaults.timeout = 5000;

// axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "http://www.lingliyi.icu:3000";
// axios.defaults.baseURL = "/api";

// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem("token");
//   return config;
// });
Vue.prototype.$http = axios;


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

//连续点击多次路由报错解决方法
import Router from "vue-router";
import {
  Tree
} from "element-ui";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
