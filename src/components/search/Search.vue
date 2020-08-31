<template>
  <div>
    <div class="search">
      <p>
        搜索
        <span>"{{ key }}"</span>
        ，找到{{ total }}个结果
      </p>
      <el-tabs v-model="activeName" @tab-click="tabChange($event)">
        <el-tab-pane label="单曲" name="first">
          <el-table
            :data="searchSongs.songs"
            stripe
            :row-style="{ height: '10px' }"
            style="width: 100%"
            @row-dblclick="playmusic($event)"
          >
            <el-table-column prop="index" width="50"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="歌曲标题" width="380"></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="al.name" label="专辑"></el-table-column>
            <el-table-column prop="dt" label="时长" width="60"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <div class="playlist-card">
            <ul>
              <li
                v-for="item in searchPlayList.playlists"
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
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <div class="mv-card">
            <ul>
              <li v-for="item in searchMv.mvs" :key="item.id" @click="mvDetail(item.id)">
                <div class="img-wrap">
                  <img :src="item.cover" alt />
                </div>
                <div class="title-wrap">
                  <div>{{ item.name }}</div>
                  <div>{{ item.artistName }}</div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      //搜索的值
      key: "",
      //搜索到
      total: 0,
      //歌曲
      searchSongs: {},
      //歌单
      searchPlayList: {},
      //mv
      searchMv: {},

      //搜索类型
      type: 1,
    };
  },
  created() {
    this.key = this.$route.params.key;
    this.getSearchKey();
    this.getSearchPlaylist();
    this.getSearchMv();
  },
  methods: {
    //搜索单曲
    async getSearchKey() {
      const { data: res } = await this.$http.get(
        "/cloudsearch?type=1&limit=100&keywords=" + this.key
      );
      //时间戳转换
      res.result.songs.forEach((el) => {
        var dt = new Date(el.dt);
        const mm = (dt.getMinutes() + "").padStart(2, "0");
        const ss = (dt.getSeconds() + "").padStart(2, "0");
        el.dt = mm + ":" + ss;
      });
      //索引值
      for (var i = 0; i < res.result.songs.length; i++) {
        if (i < 9) {
          res.result.songs[i].index = "0" + (i + 1);
        } else {
          res.result.songs[i].index = i + 1;
        }
      }
      this.searchSongs = res.result;
      this.total = this.searchSongs.songCount;
      console.log(res);
    },
    //搜索歌单
    async getSearchPlaylist() {
      const { data: res } = await this.$http.get(
        "/cloudsearch?limit=50&type=1000&keywords=" + this.key
      );
      this.searchPlayList = res.result;
      console.log(res);
    },
    //获取单个歌单
    async getSongList(id) {
      this.$router.push("/playlist/" + id);
    },
    //搜索mv
    async getSearchMv() {
      const { data: res } = await this.$http.get(
        "/cloudsearch?limit=50&type=1004&keywords=" + this.key
      );
      this.searchMv = res.result;
      console.log(res);
    },
    //mv详情
    mvDetail(id) {
      this.$router.push("/mv/" + id);
    },
    //tab变化
    tabChange(event) {
      console.log(event);
      if (event.name === "second") {
        this.total = this.searchPlayList.playlistCount;
      } else if (event.name === "third") {
        this.total = this.searchMv.mvCount;
      }
    },
    //双击列播放音乐
    async playmusic(event) {
      // // 查找结果下标位置
      for (var i = 0; i < this.searchSongs.songs.length; i++) {
        if (this.searchSongs.songs[i].id == event.id) {
          this.searchSongs.songs.index = i;
        }
      }
      this.$bus.emit("playList", this.searchSongs.songs);
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  font-size: 12px;
}
.search {
  p {
    font-size: 12px;
    span {
      color: rgb(34, 165, 241);
    }
  }
}
.search .playlist-card {
  //   margin-top: 20px;
  width: 98%;
  margin: 20px auto;
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
        img {
          width: 100%;
          height: 100%;
          //   border-radius: 5px;
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
.search .mv-card {
  margin-top: 20px;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li:nth-child(3n) {
      margin: 0;
    }
    // li:last-child {
    //   margin-left: 8px;
    // }
    li {
      margin-right: 0.9rem;
      width: -webkit-calc((100% - 0.9rem * 3)/ 3);
      width: calc((100% - 0.9rem * 3) / 3);
      cursor: pointer;
      margin-bottom: 25px;
      .img-wrap {
        width: 100%;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title-wrap {
        div:nth-child(1) {
          padding-top: 5px;
          font-size: 13px;
        }
        div:nth-child(2) {
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
      }
    }
  }
  ul:after {
    content: " ";
    flex: auto;
  }
}
</style>
