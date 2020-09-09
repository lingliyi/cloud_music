<template>
  <div id="app">
    <el-container class="container">
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :key="$route.fullPath"></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <play-music></play-music>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
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
  bottom: 55px;
}
.el-main {
  // padding: 0;
  position: absolute;
  left: 250px;
  right: 0;
  top: 40px;
  bottom: 50px;
  overflow-y: scroll;
  padding: 10px;
}
.el-footer {
  // display: flexed;
  // position: absolute;
  // background-color: bisque;

  width: 100%;
  padding: 0;
  margin: 0;
  z-index: 999;
}
</style>
