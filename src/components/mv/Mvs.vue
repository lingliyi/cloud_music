<template>
  <div>
    <div class="mvs">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频" name="first">
          <Video></Video>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <Mv></Mv>
        </el-tab-pane>
      </el-tabs> -->
      <Mv></Mv>
    </div>
  </div>
</template>

<script>
const Video = () =>
  import(/* webpackChunkName:"Home" */ "./children/Video.vue");
const Mv = () => import(/* webpackChunkName:"Home" */ "./children/Mv.vue");

export default {
  //封装组件
  components: {
    // Video,
    Mv
  },
  data() {
    return {
      //tab选择项
      activeName: ""
    };
  },
  created() {
    this.activeName =
      window.sessionStorage.getItem("tabActive") == null
        ? "first"
        : window.sessionStorage.getItem("tabActive");
    console.log(this.activeName);
  },
  methods: {
    //tab点击
    handleClick(event) {
      window.sessionStorage.setItem("tabActive", event.name);
      console.log(event);
    }
  }
};
</script>

<style lang="less" scoped>
.mvs {
  width: 97%;
  margin: 0px auto;
}
</style>
