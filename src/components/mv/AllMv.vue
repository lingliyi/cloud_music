<template>
  <div>
    <div class="allmv">
      <!-- 最新mv -->
      <div class="mv">
        <h1>全部MV</h1>
        <div class="fenge"></div>
        <div class="tag">
          <!-- 标签 -->
          <div class="tabs">
            <span>地区:</span>
            <ul>
              <li
                :class="item == queryInfo.area ? 'active' : ''"
                v-for="(item, index) in area"
                :key="index"
                @click="areaChange(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="tabs">
            <span>类型:</span>
            <ul>
              <li
                :class="item == queryInfo.type ? 'active' : ''"
                v-for="(item, index) in type"
                :key="index"
                @click="typeChange(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="tabs">
            <span>排序:</span>
            <ul>
              <li
                :class="item == queryInfo.order ? 'active' : ''"
                v-for="(item, index) in order"
                :key="index"
                @click="orderChange(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="fenge"></div>
        <div class="mv-card">
          <ul>
            <li v-for="item in allMv" :key="item.id" @click="mvDetail(item.id)">
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
      <el-pagination
        @current-change="sizeChang"
        :page-size="120"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //地区
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      //类型
      type: ["全部", "官方版", "原生", "现场版", "网易出品"],
      //排序
      order: ["上升最快", "最热", "最新"],
      //全部mv数据
      allMv: [],

      //选中类数据
      queryInfo: {
        area: "全部",
        type: "全部",
        order: "上升最快"
      },
      //页数
      pagenum: 0,
      //数据条数
      total: 0
    };
  },
  created() {
    this.getAllMv();
    this.getTest();
  },
  methods: {
    async getTest() {
      const { data: res } = await this.$http.get(
        "/mv/all?type=网易出品&area=内地&order=最新"
      );
      console.log(res);
    },
    async getAllMv() {
      const { data: res } = await this.$http.get(
        "/mv/all?limit=120&offset=" +
          this.pagenum * 120 +
          "&area=" +
          this.queryInfo.area +
          "&type=" +
          this.queryInfo.type +
          "&order=" +
          this.queryInfo.order
      );
      this.allMv = res.data;
      if (res.count) {
        this.total = res.count;
      }
      // console.log(res);
    },
    //标签变化
    //地区
    areaChange(item) {
      this.queryInfo.area = item;
      this.getAllMv();
    },
    //类型
    typeChange(item) {
      this.queryInfo.type = item;
      this.getAllMv();
    }, //排序
    orderChange(item) {
      this.queryInfo.order = item;
      this.getAllMv();
    },
    //页数变化
    sizeChang(newPage) {
      this.pagenum = newPage - 1;
      this.getAllMv();
    },
    //mv详情
    mvDetail(id) {
      this.$router.push("/mv/" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.allmv {
  width: 97%;
  margin: 0 auto;
}
h1 {
  margin: 0;
  padding: 0;
  font-weight: 400;
}
.mv .tag {
  margin: 20px 0;
}
.mv .tabs {
  margin-top: 10px;
  display: flex;
  span {
    font-size: 12px;
  }
  > ul {
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    color: rgb(102, 102, 102);
    li {
      padding: 3px 15px;
      cursor: pointer;
      line-height: 13px;
    }
  }
  ul li:not(:last-child) {
    border-right: 0.8px solid rgb(204, 204, 204);
  }
}
.active {
  color: pink;
}
.mv .mv-card {
  margin-top: 30px;
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
        border: rgb(229, 229, 229) solid 0.5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title-wrap {
        div:nth-child(1) {
          word-break: break-all;
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
.allmv .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
