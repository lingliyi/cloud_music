<template>
  <div>
    <div class="mv">
      <!-- 最新mv -->
      <div class="new-mv">
        <!-- 标签 -->
        <div class="tabs">
          <h1>最新MV</h1>
          <ul>
            <li
              :class=" areaChange === item ? 'active' : ''"
              v-for="(item,index) in area"
              :key="index"
              @click="getMvArea(item)"
            >{{item}}</li>
            <li class="more" @click="allMv">更多></li>
          </ul>
        </div>
        <div class="fenge"></div>

        <div class="mv-card">
          <ul>
            <li v-for="item in mvFirst" :key="item.id" @click="mvDetail(item.id)">
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
      </div>
      <!-- 网易出品mv -->
      <div class="hot-mv">
        <h1>网易出品</h1>
        <div class="fenge"></div>
        <div class="mv-card">
          <ul>
            <li v-for="item in mvExclusive" :key="item.id" @click="mvDetail(item.id)">
              <div class="img-wrap">
                <img :src="item.cover" alt />
              </div>
              <div class="title-wrap">
                <div>{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- mv排行榜 -->
      <div class="top-mv">
        <!-- 标签 -->
        <div class="tabs">
          <h1>MV排行榜</h1>
          <ul>
            <li v-for="(item,index) in area" :key="index" @click="getMvArea(item)">{{item}}</li>
            <li class="more">更多></li>
          </ul>
        </div>
        <div class="fenge"></div>
        <div class="toplist">
          <ul>
            <li v-for="item in topMv" :key="item.id">
              <div class="index">
                <span>{{ item.index }}</span>
              </div>
              <div class="newlist-img" @click="mvDetail(item.id)">
                <img :src="item.cover" alt />
                <span>热度: {{item.score}}</span>
              </div>
              <div class="newlist-title">
                <div>{{ item.name }}</div>
                <div>{{ item.artistName}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: ["内地", "港台", "欧美", "日本", "韩国"],
      //最新mv
      mvFirst: [],
      //网易出品mv
      mvExclusive: [],
      //mv排行榜
      topMv: [],
      //选中的地区
      areaChange: "",

      //选中类
      activeClass: "",
    };
  },
  created() {
    this.getMvFirst();
    this.getMvExclusive();
    this.getTopMv();
  },
  methods: {
    //最新mv标签切换
    getMvArea(area) {
      this.areaChange = area;
      this.getMvFirst();
    },
    //最新mv
    async getMvFirst() {
      const { data: res } = await this.$http.get(
        "/mv/first?limit=6&area=" + this.areaChange
      );
      this.mvFirst = res.data;
      // console.log(res);
    },
    //网易出品mv
    async getMvExclusive() {
      const { data: res } = await this.$http.get("/mv/exclusive/rcmd?limit=6");
      this.mvExclusive = res.data;
      // console.log(res);
    },
    //mv排行榜
    async getTopMv() {
      const { data: res } = await this.$http.get("/top/mv?limit=10");
      this.topMv = res.data;
      for (var i = 0; i < this.topMv.length; i++) {
        this.topMv[i].index = i < 9 ? "0" + (i + 1) : i + 1;
      }
      // console.log(res);
    },
    //全部mv
    allMv() {
      this.$router.push("/allmv");
    },

    //mv详情
    mvDetail(id) {
      this.$router.push("/mv/" + id);
    },
  },
};
</script>
<style lang="less" scoped>
.active {
  color: pink;
}
.mv .tabs {
  margin-top: 10px;
  display: flex;
  h1 {
    margin: 0;
    padding: 0;
    font-weight: 400;
    // font-size: 25px;
  }
  > ul {
    display: flex;
    align-items: flex-end;
    font-size: 13px;
    color: rgb(102, 102, 102);
  }
  li {
    padding: 3px 15px;
    cursor: pointer;
    > span {
      margin: 0 10px;
    }
  }
  ul li:not(:nth-child(5)) {
    border-right: 0.8px solid rgb(204, 204, 204);
  }
  ul li:nth-child(6) {
    border: none;
  }

  .more {
    position: absolute;
    right: 0;
  }
}
.mv .mv-card {
  margin-top: 20px;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 32%;
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
}
.mv .hot-mv {
  h1 {
    margin: 0;
    padding: 0;
  }
}
.mv .top-mv {
  .toplist {
    display: flex;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      li:nth-of-type(odd) {
        border-right: rgb(237, 237, 237) solid 0.4px;
      }
      li {
        width: 50%;
        display: flex;
        height: 150px;
        border-top: rgb(237, 237, 237) solid 0.4px;
        box-sizing: border-box;
        .index {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          font-size: 18px;
          color: rgb(136, 136, 136);
        }
        .newlist-img {
          position: relative;
          height: 150px;
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            width: 180px;
            height: 100px;
          }
          span {
            position: absolute;
            right: 5px;
            top: 28px;
            font-size: 12px;
            color: white;
          }
        }
        .newlist-title {
          margin-left: 10px;
          height: 150px;
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
}
</style>