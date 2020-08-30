<template>
  <div>
    <div class="content">
      <div class="tabs">
        <ul>
          热门标签:
          <li
            v-for="(item, index) in playlisttag.tags"
            :key="item.id"
            @click="tagsChange(item)"
          >
            {{ item.name }}
            <span v-if="index !== playlisttag.tags.length - 1">|</span>
          </li>
        </ul>
      </div>
      <div class="playlist-card">
        <ul>
          <li
            v-for="item in playlist.playlists"
            :key="item.id"
            @click="getSongList(item.id)"
            class="card"
          >
            <div class="imgbox">
              <img :src="item.coverImgUrl" alt />
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <el-pagination
        @current-change="sizeChang"
        :page-size="50"
        layout="prev, pager, next"
        :total="queryInfo.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //歌单分类
      playlisttag: [],
      //热门歌单数据
      playlist: [],

      //分页数据
      queryInfo: {
        //热门标签
        cat: "",
        //页数
        pagenum: 0,
        //数据条数
        total: 0
      }
    };
  },
  created() {
    this.getPlayListTag();
    this.getPlayList();
  },
  methods: {
    //获取热门歌单分类
    async getPlayListTag() {
      const { data: res } = await this.$http.get("/playlist/hot");
      this.playlisttag = res;
      //   console.log(res);
    },
    //热门分类切换
    tagsChange(item) {
      this.queryInfo.cat = item.name;
      this.getPlayList();
    },
    //获取歌单 ( 网友精选碟 )
    async getPlayList() {
      const { data: res } = await this.$http.get(
        "/top/playlist?limit=50&offset=" +
          this.queryInfo.pagenum * 50 +
          "&order=hot&cat=" +
          this.queryInfo.cat
      );
      this.playlist = res;
      this.queryInfo.total = res.total;
      //   console.log(res);
    },
    //页数变化
    sizeChang(newPage) {
      this.queryInfo.pagenum = newPage - 1;

      this.getPlayList();
    },

    //获取单个歌单
    async getSongList(id) {
      this.$router.push("/playlist/" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 97%;
  margin: 10px auto;
}
.content .tabs {
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
.content .playlist-card {
  margin-top: 20px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-inline-start: 0px;
    > li {
      height: 235px;
      width: 180px;
      list-style: none;
      cursor: pointer;
      .imgbox {
        width: 180px;
        height: 180px;
        border: rgb(237, 237, 237) solid 0.7px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        margin: 0;
        margin-top: 8px;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 17px;
        font-size: 13px;
      }
    }
  }
}
.content .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
