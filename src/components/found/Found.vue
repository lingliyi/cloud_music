<template>
  <div>
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
          <img :src="item.imageUrl" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 热门歌单 -->
    <div class="hotlist">
      <div>
        <h1>热门推荐</h1>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="item in hotlist.slice(0, 10)"
            :key="item.id"
            :class="item.className"
            @click="getSongList(item.id)"
          >
            <div class="imgbox">
              <img :src="item.picUrl" alt />
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="newmusic">
      <div>
        <h1>最新音乐</h1>
      </div>
      <div class="newlist">
        <ul>
          <li v-for="item in newlist.slice(0, 5)" :key="item.id">
            <div class="index">
              <span>{{ item.index }}</span>
            </div>
            <div class="newlist-img">
              <img :src="item.album.picUrl" alt />
            </div>
            <div class="newlist-title">
              <div>{{ item.name }}</div>
              <div>{{ item.artists[0].name }}</div>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="item in newlist.slice(5, 10)" :key="item.id">
            <div class="index">
              <span>{{ item.index }}</span>
            </div>
            <div class="newlist-img">
              <img :src="item.album.picUrl" alt />
            </div>
            <div class="newlist-title">
              <div>{{ item.name }}</div>
              <div>{{ item.artists[0].name }}</div>
              <!-- <p>{{ item.name }}</p>
              <p>{{ item.artists[0].name }}</p>-->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 推荐mv -->
    <div class="mv">
      <div>
        <h1>推荐MV</h1>
      </div>
      <ul>
        <li v-for="item in mvlist.slice(0, 3)" :key="item.id" @click="mvDetail(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
          </div>
          <div class="title-wrap">
            <div>{{ item.name }}</div>
            <div>{{ item.artistName }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据
      bannerlist: [],
      //热门歌单
      hotlist: [],
      //获取单个歌单数据
      songlist: [],
      //歌单id
      songlistid: [],
      //最新音乐
      newlist: [],
      //推荐mv
      mvlist: [],
    };
  },
  created() {
    this.getBanner();
    this.getHot();
    this.getNewList();
    this.getMv();
  },
  methods: {
    async getBanner() {
      const { data: res } = await this.$http.get("/banner");
      this.bannerlist = res.banners;
      // console.log(res);
    },
    //获取热门推荐歌单
    async getHot() {
      const { data: res } = await this.$http.get("/personalized");
      this.hotlist = res.result;
      // console.log(this.hotlist);
    },
    //获取单个歌单
    async getSongList(id) {
      this.$router.push("/playlist/" + id);
    },
    //获取最新音乐
    async getNewList() {
      const { data: res } = await this.$http.get("/top/song?type=0");
      this.newlist = res.data;
      for (var i = 0; i < this.newlist.length; i++) {
        this.newlist[i].index = i < 9 ? "0" + (i + 1) : i + 1;
      }
      // console.log(this.newlist);
    },
    //获取推荐mv
    async getMv() {
      const { data: res } = await this.$http.get("/personalized/mv");
      this.mvlist = res.result;
      console.log(res);
    },
    //mv详情
    mvDetail(id) {
      this.$router.push("/mv/" + id);
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
// 轮播图
.banner {
  // height: 500px;
  width: 95%;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
.hotlist {
  width: 95%;
  margin: 0 auto;
}
.list {
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-inline-start: 0px;
    li {
      height: 235px;
      width: 180px;
      list-style: none;
      cursor: pointer;
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

.imgbox {
  width: 180px;
  height: 180px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
//最新音乐
.newmusic {
  width: 95%;
  margin: 0 auto;
}
.newlist {
  display: flex;
  border: rgb(237, 237, 237) solid 0.4px;
  ul:nth-child(1) {
    border-right: rgb(237, 237, 237) solid 0.4px;
  }
  ul {
    width: 50%;
    list-style: none;
    margin: 0;
    padding: 0;
    li:nth-of-type(odd) {
      // margin-bottom: 5px;
    } //奇数行
    li:nth-of-type(even) {
      background-color: rgb(245, 245, 247);
    } //偶数行
    li:hover {
      background-color: rgb(235, 236, 237);
    }
    li {
      display: flex;
      // margin-top: 10px;
      height: 55px;
      cursor: pointer;
      .index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        font-size: 13px;
        color: rgb(136, 136, 136);
      }
      .newlist-img {
        height: 55px;
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .newlist-title {
        margin-left: 10px;
        // margin-top: 5px;
        height: 55px;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div:nth-child(2) {
          margin-top: 5px;
          font-size: 12px;
          color: rgb(136, 136, 136);
        }
      }
    }
  }
}
//推荐mv
.mv {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 30px;
  ul {
    display: flex;
    justify-content: center;
    li:nth-of-type(even) {
      margin: 0 15px;
    }
    li {
      width: 33.33%;
      cursor: pointer;
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
          font-size: 13px;
        }
        div:nth-child(2) {
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
      }
    }
  }
}
</style>
