<template>
  <div>
    <div class="video">
      <!-- 下拉菜单 -->
      <el-row>
        <el-col :span="12">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{span}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="first" :command="0">全部视频</el-dropdown-item>
              <el-dropdown-item
                v-for="item in videogrouplist "
                :key="item.id"
                :command="(item.id)"
                :class="item.id === activeid ? activemenu : 0"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 标签 -->
      <div class="tabs">
        <ul>
          热门标签:
          <li v-for="(item,index) in videocategory" :key="item.id">
            {{item.name}}
            <span v-if="index !== (videocategory.length-1)">|</span>
          </li>
        </ul>
      </div>
      <!-- 视频内容 -->
      <div class="video-list">
        <div class="video-card">
          <div class="img-wrap">
            <img src alt />
          </div>
          <p class="title"></p>
          <p class="username"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //标签
      videogrouplist: [],
      //视频分类
      videocategory: [],
      //视频数据
      videolist: [],

      // 被选中的标签项
      span: "全部视频",
      activeid: "",
      activemenu: "",
    };
  },
  created() {
    this.getVideoGroupList();
    // this.getVideoCategory();
    // this.getAllVideo();
  },
  methods: {
    //所有视频标签列表
    async getVideoGroupList() {
      const { data: res } = await this.$http.get("/video/group/list");
      this.videogrouplist = res.data;
      // console.log(res);
    },
    //获取视频分类列表
    async getVideoCategory() {
      const { data: res } = await this.$http.get("/video/category/list");
      this.videocategory = res.data;
      console.log(res);
    },
    //标签点击
    handleCommand(id) {
      if (id === 0) {
        this.getAllVideo();
      } else {
        this.getVideoGroup(id);
      }
      this.activemenu = "active-menu";
      this.activeid = id;
      this.videogrouplist.some((el) => {
        if (id === el.id) {
          this.span = el.name;
          return true;
        }
      });
      //   console.log(name);
    },
    //获取全部视频
    async getAllVideo() {
      const { data: res } = await this.$http.get("/video/timeline/all");
      this.videolist = res.data;
      console.log(res);
    },
    //获取视频标签/分类下的视频
    async getVideoGroup(id) {
      const { data: res } = await this.$http.get("/video/group?id=" + id);
      console.log(res);
    },
  },
};
</script>
<style lang="less" scoped>
.video {
  margin-top: 10px;
}
.video .el-row {
  div {
    .el-dropdown {
      .el-dropdown-link {
        cursor: pointer;
        border: rgb(225, 225, 226) solid 0.5px;
        text-align: center;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 3px 10px;
        font-size: 13px;
        > .el-icon--right {
          margin: 0;
        }
      }
    }
  }
}
.el-dropdown-menu {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 218px !important;
  width: 52%;
  height: 300px;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 20px;
  //   被选中的菜单项
  .active-menu {
    border-color: pink !important;
    z-index: 1;
    // margin: 0 0 -0.5px -0.5px;
  }
  //第一个标签 全部视频
  .first {
    width: 100% !important;
    margin-bottom: 10px !important;
  }
  .el-dropdown-menu__item {
    border: rgb(225, 225, 226) solid 1px;
    margin: 0 0 -1px -1px;

    font-size: 12px;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
}

.video .tabs {
  margin-top: 10px;
  > ul {
    display: flex;
    font-size: 13px;
    color: rgb(102, 102, 102);
  }
  li {
    margin-left: 10px;
    cursor: pointer;
    > span {
      margin: 0 10px;
    }
  }
}
</style>