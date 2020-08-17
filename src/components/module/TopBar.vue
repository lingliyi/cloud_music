<template>
  <div id="app">
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
      <!-- 搜索框 -->
      <div class="search">
        <el-input placeholder="搜索"></el-input>
        <span>
          <i class="el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
  },
};
</script>
<style lang="less" scoped>
.top-bar {
  width: 100%;
  background-color: lightcyan;
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
      padding: 10px;
    }
  }
  > .search {
    display: flex;
    position: absolute;
    right: 20px;
    width: 170px;
    > span {
      line-height: 30px;
      position: absolute;
      left: 13px;
    }
  }
}
</style>
