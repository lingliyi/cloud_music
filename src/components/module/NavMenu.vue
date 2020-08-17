<template>
  <div>
    <div class="nav">
      <!-- default-active 当前激活菜单的index -->
      <el-menu default-active="2">
        <el-menu-item index="1">
          <i class="el-icon-user-solid"></i>
          <span slot="title" @click="login">未登录</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-headset"></i>
          <span slot="title" @click="harf">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-tickets"></i>
          <span slot="title">推荐歌单</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-upload"></i>
          <span slot="title">最新音乐</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-video-camera"></i>
          <span slot="title">最新MV</span>
        </el-menu-item>
      </el-menu>
      <!-- 登录弹窗 -->
      <el-dialog title="登录" :visible.sync="loginDialogVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="loginDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //登录弹窗
      loginDialogVisible: false
    };
  },
  methods: {
    //登录
    login() {
      const { data: res } = this.$http
        .get("/login/cellphone")
        .catch(err => err);
      console.log(res);
      this.loginDialogVisible = true;
    },
    harf() {
      this.$router.push("/found");
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  background-color: #ededed;
  > .is-active {
    color: red;
  }
}
</style>
