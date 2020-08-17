<template>
  <div id="app">
    <el-container class="container">
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-footer> <play-music></play-music> </el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //音乐url
      // audio: {
      //   name: "",
      //   artist: "",
      //   url: "",
      //   cover: '', // prettier-ignore
      //   lrc: ""
      // }
    };
  },
  created() {
    // this.playmusic();
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  // width: 100%;
}
.el-header {
  padding: 0;
  margin: 0;
  height: 40px !important;
  position: relative;
}
.el-aside {
  background-color: #ededed;
  display: block;
  position: absolute;
  left: 0;
  top: 40px;
  bottom: 0;
}
.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: scroll;
}
.el-footer {
  display: flexed;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: bisque;
}
</style>
