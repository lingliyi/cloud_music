<template>
  <div class="song-list">
    <div class="header">
      <!-- 图片 -->
      <div class="img-warp">
        <img :src="songlist.coverImgUrl" alt />
      </div>
      <div class="content">
        <!-- 标题 -->
        <div class="title-warp">
          <p>{{ songlist.name }}</p>
        </div>
        <!-- 创建人 时间 -->
        <div class="creator-warp">
          <img :src="profile.avatarUrl" alt />
          <p>{{ profile.nickname }}</p>
          <p>
            {{ this.songlist.createTime | dataFormat }}
            创建
          </p>
        </div>
        <!-- 按钮行 -->
        <div class="action-warp">
          <el-button type="danger" icon="el-icon-video-play" size="small "
            >播放全部</el-button
          >
        </div>
        <!-- 简介 -->
        <div class="desc-warp">
          <p>标签: {{ tags.join("/") }}</p>
          <p>简介: {{ songlist.description }}</p>
        </div>
      </div>
    </div>
    <div class="tabs-warp">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table
            :data="playlist"
            stripe
            :row-style="{ height: '10px' }"
            style="width: 100%"
            @row-dblclick="playmusic($event)"
          >
            <el-table-column prop="index" width="50"></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="name"
              label="歌曲标题"
              width="350"
              class-name="title"
            ></el-table-column>
            <el-table-column
              prop="ar"
              label="歌手"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <!-- {{ scope.row.ar }} -->
                <span
                  v-for="(item, index) in scope.row.ar"
                  :key="'user-' + index"
                  >{{ item.name
                  }}<span
                    v-if="
                      scope.row.ar.length > 1 && index + 1 < scope.row.ar.length
                    "
                  >
                    /
                  </span></span
                >
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="al.name"
              label="专辑"
            ></el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              width="60"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          :label="'评论(' + (comments.total || 0) + ')'"
          name="second"
        >
          <div class="comments">
            <h4>精彩评论</h4>
            <div class="fenge"></div>
            <ul>
              <li
                v-for="(item, index) in comments.hotComments"
                :key="'hot-' + index"
              >
                <div class="conet">
                  <div class="comments-left">
                    <img :src="item.user.avatarUrl" alt />
                  </div>
                  <div class="comments-right">
                    <div class="top">
                      <p>
                        <span>{{ item.user.nickname }}:</span>
                        {{ item.content }}
                      </p>
                      <!-- 回复 -->
                      <p>
                        <span v-if="item.reply !== undefined">
                          @{{
                            item.reply === undefined
                              ? ""
                              : item.reply.user.nickname
                          }}:
                        </span>
                        {{ item.reply === undefined ? "" : item.reply.content }}
                      </p>
                    </div>
                    <div class="buttom">
                      <p>{{ item.time | dataFormat }}</p>
                      <span class="fa fa-thumbs-o-up"
                        >({{ item.likedCount }})</span
                      >
                    </div>
                  </div>
                </div>
                <div class="fenge"></div>
              </li>
            </ul>
          </div>
          <div class="comments">
            <h4>最新评论{{ comments.length }}</h4>
            <div class="fenge"></div>
            <ul>
              <li
                v-for="(item, index) in comments.comments"
                :key="'pu-' + index"
              >
                <div class="conet">
                  <div class="comments-left">
                    <img :src="item.user.avatarUrl" alt />
                  </div>
                  <div class="comments-right">
                    <div class="top">
                      <p>
                        <span>{{ item.user.nickname }}:</span>
                        {{ item.content }}
                      </p>
                      <!-- 回复 -->
                      <p>
                        <span v-if="item.reply !== undefined">
                          @{{
                            item.reply === undefined
                              ? ""
                              : item.reply.user.nickname
                          }}:
                        </span>
                        {{ item.reply === undefined ? "" : item.reply.content }}
                      </p>
                    </div>
                    <div class="buttom">
                      <p>{{ item.time | dataFormat }}</p>
                      <span class="fa fa-thumbs-o-up"
                        >({{ item.likedCount }})</span
                      >
                    </div>
                  </div>
                </div>
                <div class="fenge"></div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //音乐url
      audio: {
        id: 1,
        name: "", //歌名
        time: "", //时间
        artist: "", //歌手
        album: "", //专辑
        cover: "", //缩略图
        url: "" //歌曲url
      },

      //歌单数据
      songlist: {},
      //歌单创建者
      songlistuser: [],
      // 歌单id
      songlistid: this.$route.params.id,
      //歌曲id列表
      listid: [],
      //歌曲详细数据
      playlist: [],

      //歌单评论
      comments: {},

      //歌单标签
      tags: [],
      //创建者数据
      profile: {},
      //
      activeName: "first"
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    async getSongList() {
      //获取歌单信息
      const { data: res } = await this.$http.get(
        "/playlist/detail?id=" + this.songlistid
      );
      this.songlist = res.playlist;
      this.tags = res.playlist.tags;

      // 把歌曲id添加进数组中
      this.songlist.trackIds.forEach(el => {
        this.listid.push(el.id);
      });
      //   console.log(res);
      //长度限制
      this.listid = this.listid.slice(0, 500);
      // console.log(this.listid);
      //获取歌单里所有歌曲的信息
      const { data: res1 } = await this.$http.get(
        "/song/detail?ids=" + this.listid.join(",")
      );
      // console.log(res1);
      //歌曲时长 时间戳转化
      if (res1.songs) {
        res1.songs.forEach(el => {
          var dt = new Date(el.dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          el.dt = mm + ":" + ss;
        });
        //索引值
        for (var i = 0; i < res1.songs.length; i++) {
          if (i < 9) {
            res1.songs[i].index = "0" + (i + 1);
          } else {
            res1.songs[i].index = i + 1;
          }
        }
        this.playlist = res1.songs;
        // console.log("歌单");
        // console.log(this.playlist);
      }

      //获取歌单的创建者
      const { data: res2 } = await this.$http.get(
        "/user/detail?uid=" + this.songlist.userId
      );
      this.songlistuser = res2;
      this.profile = res2.profile;
      //   console.log(res2);

      //获取歌曲评论
      const { data: res3 } = await this.$http.get(
        "/comment/playlist?id=" + this.songlistid
      );
      this.comments = res3;
      //新评论
      for (let i = 0; i < this.comments.comments.length; i++) {
        this.comments.comments[i].reply = this.comments.comments[
          i
        ].beReplied[0];
      }
      //热评论
      for (let i = 0; i < this.comments.hotComments.length; i++) {
        this.comments.hotComments[i].reply = this.comments.hotComments[
          i
        ].beReplied[0];
      }
      //   console.log(res3);
    },

    //双击列播放音乐
    async playmusic(event) {
      // // 查找结果下标位置
      for (var i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i].id == event.id) {
          this.playlist.index = i;
        }
      }

      console.log("-------------");
      console.log(event);
      // this.playlist.index = event.index;

      this.$bus.emit("playList", this.playlist);
      // console.log("----");
      // console.log(this.playlist);
    }
  },
  beforeMount() {}
};
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.header {
  display: flex;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 50px;
}
.header .img-warp {
  width: 200px;
  height: 200px;
}
.header .img-warp img {
  width: 200px;
  height: 200px;
  border-radius: 3px;
}
.header .content {
  margin-left: 20px;
}

.header .content .title-warp p {
  font-size: 17px;
  margin: 0;
}
.header .content .creator-warp {
  display: flex;
  height: 30px;
  margin-top: 15px;
}
.header .content .creator-warp img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.header .content .creator-warp p {
  line-height: 30px;
  margin: 0;
  padding: 0 10px;
}
.header .content .action-warp {
  padding-top: 15px;
}
.header .content .action-warp button {
  width: 120px;
  color: white;
  background-color: red;
}
.header .content .desc-warp {
  font-size: 14px;
}
.tabs-warp {
  width: 100%;
  margin: 30px auto;
  margin-bottom: 60px;
  //   font-weight: 400;
}
.el-table {
  font-size: 12px;
}

//评论
.comments ul > li .conet {
  display: flex;
}
.comments .fenge {
  padding-top: 0px;
  margin-bottom: 15px;
  height: 0.5px;
  border: none;
  border-top: 0.5px solid rgb(239, 239, 239);
}
.comments ul > li .fenge {
  margin-top: 15px;
  margin-bottom: 15px;
  height: 0.5px;
  border: none;
  border-top: 0.5px solid rgb(239, 239, 239);
}

.comments ul > li .comments-left {
  width: 40px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.comments ul > li .comments-right {
  width: 100%;
  margin-left: 20px;

  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
}
.comments ul > li .comments-right .top {
  width: 100%;
  span {
    color: rgb(12, 115, 194);
    display: inline-block;
    padding-right: 5px;
  }
  p:nth-child(1) {
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    // padding-top: 10px;
    background: rgb(241, 241, 244);
  }
}
.comments ul > li .comments-right .buttom {
  width: 100%;
  margin-top: 10px;
  font-weight: 300;
  position: relative;
  p {
    // color: rgb(199, 194, 194);
    display: inline-block;
    font-weight: 300;
  }
  span {
    position: absolute;
    right: 0;
    font-size: 13px;
  }
  .fa-thumbs-o-up:before {
    padding-right: 5px;
  }
}
</style>
