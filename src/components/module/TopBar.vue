<template>
  <div id="app" @click.stop>
    <!--  顶栏 -->
    <div class="top-bar">
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="green"></div>
      <!-- 前进返回 -->
      <div class="goto">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <i class="el-icon-arrow-right" @click="forward"></i>
      </div>
      <!-- 搜索框 @change="doSearch"   -->
      <div class="search" @click="searchShowBox($event)">
        <el-input
          placeholder="搜索"
          v-model="searchValue"
          @keyup.enter.native="doSearch"
          @input="getSearchSuggest"
        ></el-input>
        <span>
          <i class="el-icon-search"></i>
        </span>
        <div class="search-box" v-show="searchDis">
          <div class="hot" v-if="searchShow">
            <span>热搜列表</span>
            <ul>
              <li
                v-for="(item, index) in searchHotList"
                :key="index"
                @click="searchDetail(item.searchWord)"
              >{{ item.searchWord }}</li>
            </ul>
          </div>
          <div class="tips" v-if="!searchShow">
            <span>单曲</span>
            <ul>
              <li
                v-for="(item, index) in searchSuggest"
                :key="index"
                @click="searchDetail(item.name + '-' + item.artists[0].name)"
              >{{ item.name }}-{{ item.artists[0].name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: "",
      //搜索下拉框
      searchDis: false,
      //热搜列表
      searchHotList: [],
      //搜索联想
      searchSuggest: {},
      //热搜显示
      searchShow: true,
    };
  },
  created() {},
  methods: {
    //搜索框
    searchShowBox(eve) {
      this.getSearchHot();
      this.searchDis = true;
    },
    goBack() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
    //自定义输入搜索
    doSearch() {
      this.$router.push("/search/" + this.searchValue);
      this.searchDis = false;
      this.searchValue = "";
    },
    //获取热搜列表
    async getSearchHot() {
      const { data: res } = await this.$http.get("/search/hot/detail");
      this.searchHotList = res.data;
      console.log(res);
    },

    //热搜跳转
    searchDetail(key) {
      // console.log(key);
      this.searchDis = false;
      this.searchShow = false;
      this.searchValue = "";
      this.$router.push("/search/" + key);
    },
    //搜索联想
    async getSearchSuggest() {
      const { data: res } = await this.$http.get(
        "/search/suggest?keywords=" + this.searchValue
      );
      this.searchSuggest = res.result;
      this.searchShow = false;
      this.searchSuggest = res.result.songs;
      console.log(res);
    },
  },
  mounted() {
    //搜索下拉隐藏
    document.body.addEventListener(
      "click",
      () => [
        ((this.searchDis = false),
        (this.searchValue = ""),
        (this.searchShow = true)),
      ],
      false
    );
  },
};
</script>
<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 40px;
  background-color: rgb(215, 77, 69);
  display: flex;
  align-items: center;
  > .red {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 0 7px;
    background-color: rgb(228, 64, 64);
  }
  > .yellow {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 0 7px;
    background-color: yellow;
  }
  > .green {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 0 7px;
    background-color: green;
  }
  > .goto {
    margin-left: 20px;
    font-size: 25px;
    > i {
      font-style: 15px;
      padding: 0px 10px;
    }
  }
  > .search {
    display: flex;
    position: absolute;
    right: 20px;
    width: 170px;
    > span {
      line-height: 25px;
      position: absolute;
      left: 13px;
    }
  }
}
.search .search-box {
  z-index: 999;
  position: fixed;
  top: 40px;
  right: 0;
  height: 100%;
  width: 350px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.14286rem 0.57143rem 0 rgba(0, 0, 0, 0.2);
  .hot {
    > span {
      margin-top: 10px;
      margin-left: 20px;
      font-size: 12px;
      // color: rgb(217, 217, 217);
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 20px;

      li {
        padding: 5px 20px;
        margin: 5px 5px;
        border: 1px solid rgb(217, 217, 217);
        border-radius: 2px;
        font-size: 13px;
        color: rgb(102, 102, 102);
        line-height: 13px;
        cursor: pointer;
      }
      li:hover {
        background-color: rgb(245, 245, 245);
      }
    }
  }
  .tips {
    > span {
      margin-top: 10px;
      margin-left: 20px;
      font-size: 12px;
    }
    > ul {
      margin: 10px 0px;
      > li {
        height: 20px;
        padding: 10px 20px;
        font-size: 13px;
        color: rgb(122, 122, 122);
        cursor: pointer;
      }
      li:hover {
        background-color: rgb(245, 245, 245);
      }
    }
  }
}
</style>
