import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import TopBar from "../src/components/module/TopBar.vue";
import NavMenu from "../src/components/module/NavMenu.vue";
import PlayMusic from "../src/components/PlayMusic.vue";

//封装组件
Vue.component("top-bar", TopBar);
Vue.component("nav-menu", NavMenu);
Vue.component("play-music", PlayMusic);

//手动配置elemunt-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//全局css样式
import "../src/assets/css/gloabl.css";

//导入font-awesome
import "./assets/font/css/font-awesome.min.css";

//asiox
import axios from "axios";
//配置请求的根路径
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "/api";

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;

//音乐播放器插件
import APlayer from "@moefe/vue-aplayer";

Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

//连续点击多次路由报错解决方法
import Router from "vue-router";
import { Tree } from "element-ui";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
