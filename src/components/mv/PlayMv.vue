<template>
  <div>
    <el-container>
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-main>
        <div class="content">
          <!-- 左侧 -->
          <div class="video-class">
            <div class="mv-title">
              {{ mvdetail.name }}
              <span>{{ mvdetail.artistName }}</span>
            </div>
            <div class="play-mv">
              <video :src="mvurl.url" width="670" height="378" controls="controls"></video>
            </div>
            <div class="nothing" v-if="hotlength===0 && ordlength === 0 ">还没有评论，快来抢沙发叭~</div>
            <div class="comments" v-if="hotlength !== 0 ">
              <h4>精彩评论</h4>
              <div class="fenge"></div>
              <ul>
                <li v-for="item in mvcomments.hotComments" :key="item.commentId">
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
                          {{
                          item.reply === undefined ? "" : item.reply.content
                          }}
                        </p>
                      </div>
                      <div class="buttom">
                        <p>{{ item.time | dataFormat }}</p>
                        <span class="fa fa-thumbs-o-up">({{ item.likedCount }})</span>
                      </div>
                    </div>
                  </div>
                  <div class="fenge"></div>
                </li>
              </ul>
            </div>
            <div class="comments" v-if="ordlength !== 0 ">
              <h4>最新评论{{ mvcomments.length }}</h4>
              <div class="fenge"></div>
              <ul>
                <li v-for="item in mvcomments.comments" :key="item.commentId">
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
                          {{
                          item.reply === undefined ? "" : item.reply.content
                          }}
                        </p>
                      </div>
                      <div class="buttom">
                        <p>{{ item.time | dataFormat }}</p>
                        <span class="fa fa-thumbs-o-up">({{ item.likedCount }})</span>
                      </div>
                    </div>
                  </div>
                  <div class="fenge"></div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="detail">
            <div class="title">MV详情</div>
            <div class="fenge"></div>
            <div class="span">
              <span>发布时间: {{ mvdetail.publishTime }}</span>
              <span>播放次数: {{ mvdetail.duration }}次</span>
            </div>
            <div class="desc">{{ mvdetail.desc }}</div>
            <!-- mv推荐 -->
            <div class="mv-simi">
              <div class="title">相关推荐</div>
              <ul>
                <li v-for="item in mvsimi.mvs" :key="item.id" @click="mvDetail(item.id)">
                  <img :src="item.cover" alt />
                  <div class="desc-right">
                    <div>{{item.name}}</div>
                    <div>{{item.artistName}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // mv的id
      mvid: this.$route.params.id,
      //mv的url地址
      mvurl: [],
      //mv的详情
      mvdetail: [],
      //mv评论
      mvcomments: [],
      //mv推荐
      mvsimi: [],
      //mv评论长度
      hotlength: 0,
      ordlength: 0,
    };
  },
  created() {
    this.getMvUrl();
    this.getMvDetail();
    this.getMvComments();
    this.getMvSiMi();
  },
  methods: {
    //获取mv url地址
    async getMvUrl() {
      const { data: res } = await this.$http.get("/mv/url?id=" + this.mvid);
      this.mvurl = res.data;
      console.log(res);
    },
    //获取mv详情
    async getMvDetail() {
      const { data: res } = await this.$http.get(
        "/mv/detail?mvid=" + this.mvid
      );
      this.mvdetail = res.data;
      // console.log(res);
    },

    //获取mv评论
    async getMvComments() {
      const { data: res } = await this.$http.get("/comment/mv?id=" + this.mvid);
      //回复评论
      this.mvcomments = res;
      for (var i = 0; i < this.mvcomments.comments.length; i++) {
        this.mvcomments.comments[i].reply = this.mvcomments.comments[
          i
        ].beReplied[0];
      }
      //热评
      for (var i = 0; i < this.mvcomments.hotComments.length; i++) {
        this.mvcomments.hotComments[i].reply = this.mvcomments.hotComments[
          i
        ].beReplied[0];
      }
      this.hotlength = res.hotComments.length;
      this.ordlength = res.comments.length;
      console.log(res);
    },
    //获取相似mv
    async getMvSiMi() {
      const { data: res } = await this.$http.get("/simi/mv?mvid=" + this.mvid);
      this.mvsimi = res;
      // console.log(res);
    },
    //mv详情
    mvDetail(id) {
      this.$router.push("/mv/" + id);
      this.$router.go(0);
    },
  },
};
</script>
<style lang="less" scoped>
.nothing {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.el-header {
  padding: 0;
  margin: 0;
  height: 40px !important;
  position: relative;
  width: 100%;
}
.el-main {
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: scroll;
  .content {
    width: 80%;
    margin: 25px auto;
    display: flex;
    .video-class {
      width: 70%;
      .mv-title {
        margin-bottom: 10px;
        font-weight: 400;
        font-size: 18px;
        margin-left: 20px;
        span {
          padding-left: 10px;
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
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
          background: rgb(241, 241, 244);
        }
      }
      .comments ul > li .comments-right .buttom {
        width: 100%;
        margin-top: 10px;
        font-weight: 300;
        position: relative;
        font-size: 12px;
        color: rgb(102, 102, 102);
        p {
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
    }

    .detail {
      width: 30%;
      height: 100%;
      margin-left: 10px;
      .title {
        height: 24px;
        font-weight: 400;
        font-size: 18px;
      }
      .fenge {
        height: 10px;
        border-bottom: rgb(237, 237, 237) solid 0.4px;
      }
      .span {
        margin-top: 7px;
        font-size: 13px;
        color: rgb(102, 102, 102);
        font-weight: 300;
        display: flex;
        justify-content: space-between;
      }
      .desc {
        margin-top: 14px;
        font-size: 13px;
        color: rgb(102, 102, 102);
        font-weight: 400;
      }
      .mv-simi {
        margin-top: 70px;
        .title {
          height: 24px;
          font-weight: 400;
          font-size: 18px;
        }
        ul {
          li {
            display: flex;
            margin: 10px;
            cursor: pointer;
            img {
              width: 50%;
              height: 80px;
            }
            .desc-right {
              height: 80px;
              font-size: 13px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 10px;
              div:nth-child(1) {
                margin-bottom: 20px;
              }
              div:nth-child(2) {
                color: rgb(102, 102, 102);
              }
            }
          }
        }
      }
    }
  }
}
</style>
