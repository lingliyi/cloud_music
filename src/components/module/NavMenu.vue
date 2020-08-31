<template>
  <div>
    <div class="nav">
      <div class="login">
        <div v-if="!islogin">
          <i class="el-icon-user-solid"></i>
          <span slot="title" @click="loginDialogShow">未登录</span>
        </div>
        <div v-else @click="logout">
          <img :src="userDetail.profile.avatarUrl" alt />
          <span>{{ userDetail.profile.nickname }}</span>
        </div>
      </div>
      <!-- <div class="player">展位</div> -->
      <!-- default-active 当前激活菜单的index -->
      <el-menu :default-active="activePath || '1'" @select="active($event)">
        <el-menu-item index="1">
          <i class="iconfont music icon-music"></i>
          <span slot="title" @click="harf" style="padding-left:3px">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont 歌单" style="font-size:20px">&#xe68c;</i>
          <span slot="title" @click="playlist">推荐歌单</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont 排行榜" style="font-size:18px">&#xe61c;</i>
          <span slot="title" @click="toplist" style="padding-left:5px">排行榜</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont video">&#xe613;</i>
          <span slot="title" @click="voide" style="padding-left:5px">视频</span>
        </el-menu-item>
        <div v-if="islogin">
          <span class="create">创建的歌单</span>
          <el-menu-item
            :index="index + '-create'"
            v-for="(item, index) in createList"
            :key="index + '-create'"
          >
            <i
              class="iconfont GoogleMaterial ic queue music 48px icon-GoogleMaterialicqueuemusicpx"
            ></i>
            <span slot="title" @click="getSongList(item.id)">
              {{
              item.name
              }}
            </span>
          </el-menu-item>
          <span class="create">收藏的歌单</span>
          <el-menu-item
            :index="index + '-like'"
            v-for="(item, index) in likeList"
            :key="index + '-like'"
          >
            <i
              class="iconfont GoogleMaterial ic queue music 48px icon-GoogleMaterialicqueuemusicpx"
            ></i>
            <span slot="title" @click="getSongList(item.id)">
              {{
              item.name
              }}
            </span>
          </el-menu-item>
        </div>
      </el-menu>
      <!-- 登录弹窗 -->
      <el-dialog title="登录" :visible.sync="loginDialogVisible" width="30%">
        <el-input v-model="uid" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login">登录</el-button>
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
      loginDialogVisible: false,
      //选中的nav
      activePath: "",

      //表单
      uid: "",

      //用户数据
      userDetail: [],
      //用户创建歌单
      createList: [],
      //用户收藏歌单
      likeList: [],

      //登录状态
      islogin: false,
    };
  },
  created() {
    this.uid = window.sessionStorage.getItem("uid");
    this.activePath = window.sessionStorage.getItem("activePath");
    if (this.uid !== "") {
      this.login();
      this.getUserSongList();
    }
  },
  methods: {
    //登录
    async login() {
      const res = await this.$http
        .get("/user/detail?uid=" + this.uid)
        .catch((err) => {
          return;
        });
      if (res) {
        this.islogin = true;
        this.userDetail = res.data;
        this.getUserSongList();
        this.loginDialogVisible = false;
      } else {
        const h = this.$createElement;
        this.$notify.error({
          title: "错误",
          message: "uid错误",
        });
      }
      window.sessionStorage.setItem("uid", this.uid);
    },
    //退出
    logout() {
      window.sessionStorage.setItem("uid", "");
      this.islogin = false;
    },
    //登录弹窗
    loginDialogShow() {
      this.uid = "";
      this.loginDialogVisible = true;
    },
    //用户的歌单
    async getUserSongList() {
      const { data: res } = await this.$http.get(
        "/user/playlist?uid=" + this.uid
      );
      res.playlist.forEach((el) => {
        if (el.userId == this.uid) {
          this.createList.push(el);
        } else {
          this.likeList.push(el);
        }
      });
      // console.log(this.createList);
      // console.log(this.likeList);
    },
    //获取单个歌单
    getSongList(id) {
      // console.log(id);
      this.$router.push("/playlist/" + id);
    },
    harf() {
      this.$router.push("/found");
    },
    playlist() {
      this.$router.push("/playlist");
    },
    toplist() {
      this.$router.push("/toplist");
    },
    active(index) {
      window.sessionStorage.setItem("activePath", index);
    },
    voide() {
      this.$router.push("/mvs");
    },
  },
};
</script>
<style lang="less" scoped>
.iconfont {
  // font-size: 18px;
  padding: 0px 5px;
}
.nav .el-menu {
  background-color: #ededed;
  margin-bottom: 40px;
  .el-menu-item {
    padding-right: 0;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .create {
    padding: 0 10px;
    font-size: 11px;
    color: rgb(125, 125, 125);
  }
  .is-active {
    color: red;
  }
}
.nav .login {
  height: 50px;
  padding: 0 25px;
  cursor: pointer;
  font-size: 15px;
  div {
    line-height: 50px;

    i {
      margin-right: 5px;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
.nav .player {
  width: 250px;
  height: 50px;
  background-color: brown;
  position: fixed;
  bottom: 20px;
  left: 0;
  z-index: 100;
}
</style>
