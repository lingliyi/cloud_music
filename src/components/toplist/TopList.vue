<template>
  <div>
    <div class="top-list">
      <div class="bigtoplist-card">
        <h1>官方榜</h1>
        <div class="fenge"></div>
        <div class="toplist">
          <ul>
            <li v-for="item in toplist.slice(0, 4)" :key="item.id">
              <div class="toplist-img">
                <span>{{item.name}}</span>
              </div>
              <ul>
                <li v-for="(item2, index) in item.miniPlaylist" :key="item2.id">
                  <p>{{ index + 1 }}</p>
                  <p>
                    {{ item2.name
                    }}
                    <span v-if="item2.alia[0]">({{ item2.alia[0] }})</span>
                  </p>

                  <p>{{ item2.ar[0].name }}</p>
                </li>
                <div @click="musicList(item.id)">查看全部></div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="small-card">
        <h1>全球榜</h1>
        <div class="fenge"></div>
        <ul>
          <li v-for="item in toplist.slice(4)" :key="item.id" @click="musicList(item.id)">
            <div class="small-img">
              <img :src="item.coverImgUrl" alt />

              <span>
                <i class="iconfont Music Acc">&#xe73a;</i>
                {{ item.playCount | playCount }}万
              </span>
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //排行榜数据
      toplist: [],
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    //获取排行榜数据
    async getTopList() {
      const { data: res } = await this.$http.get("/toplist/detail");
      // this.toplist = res.list;
      for (var i = 0; i < 4; i++) {
        //缩略列表
        const { data: res1 } = await this.$http.get(
          "/playlist/detail?id=" + res.list[i].id
        );
        res.list[i].miniPlaylist = res1.playlist.tracks.slice(0, 8);
      }
      this.toplist = res.list;
      console.log(this.toplist);
    }, //歌单详情跳转
    musicList(id) {
      this.$router.push("/playlist/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
.top-list {
  width: 97%;
  margin: 0 auto;
  h1 {
    margin: 0;
    padding: 0;
  }
}
.bigtoplist-card {
  height: 850px;
  .toplist {
    > ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > li {
        margin-top: 20px;
        width: 32%;
        // height: 300px;
        .toplist-img {
          width: 100%;
          height: 90px;
          background-color: rgb(106, 192, 241);
          span {
            font-size: 30px;
            color: white;
          }
        }
        > ul {
          border: rgb(237, 237, 237) solid 0.5px;
          > div {
            color: rgb(136, 136, 136);
            font-size: 13px;
            height: 40px;
            line-height: 40px;
            background-color: rgb(245, 245, 247);
            text-align: right;
            cursor: pointer;
          }
          li:nth-child(2n-1) {
            background-color: rgb(245, 245, 247);
          }
          li:hover {
            background-color: rgb(235, 236, 237);
          }
          li {
            display: flex;
            color: rgb(136, 136, 136);
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            position: relative;
            p {
              margin: 0;
              padding: 0;
            }
            p:nth-child(1) {
              margin-left: 5px;
              // color: red;
              font-size: 14px;
            }
            p:nth-child(2) {
              color: rgb(51, 51, 51);
              margin-left: 20px;

              width: 160px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              span {
                color: rgb(red, green, blue);
              }
            }

            p:last-child {
              position: absolute;
              right: 5px;
              width: 50px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
.small-card {
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    > li {
      margin-right: 0.55rem;
      width: -webkit-calc((100% - 0.55rem * 5)/ 5);
      width: calc((100% - 0.55rem * 5) / 5);
      cursor: pointer;
      .small-img {
        width: 170px;
        height: 170px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border: 0.7px solid rgb(230, 230, 230);
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          padding-left: 5px;
          padding-right: 5px;
          background-color: rgba(0, 0, 0, 0.4);
          height: 20px;
          font-size: 11px;
          color: white;
          line-height: 20px;
          i {
            font-size: 12px;
          }
        }
      }
      p {
        margin: 0;
        padding: 0;
        margin-top: 5px;
        margin-bottom: 20px;
        font-size: 13px;
      }
    }
  }
  ul:after {
    content: " ";
    flex: auto;
  }
}
</style>
