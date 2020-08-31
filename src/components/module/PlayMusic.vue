<template>
  <div @click.stop>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @volumechange="onVolumechange"
      @ended="onEd"
      :src="audio.url"
      controls="controls"
      hidden="true"
    ></audio>

    <!-- 音频播放控件 -->
    <div class="audio-module">
      <!-- 缩略图 -->
      <div class="audio-img">
        <img :src="song.al.picUrl" alt />
      </div>
      <div class="audio-title">
        <p>{{ song.name }}</p>
        <p>
          <span v-for="(item, index) in song.ar" :key="'user-' + index">
            {{ item.name
            }}
            <span
              v-if="song.ar.length > 1 && index + 1 < song.ar.length"
            >/</span>
          </span>
        </p>
      </div>
      <div class="control">
        <!-- 上一首 -->
        <span>
          <i class="iconfont skip--back">&#xe60b;</i>
        </span>

        <!-- 播放/暂停 -->
        <span v-if="audio.playing">
          <i class="iconfont pause" @click="startPlayOrPause" circle type="danger">&#xe609;</i>
        </span>
        <span v-else>
          <i class="iconfont play" @click="startPlayOrPause" circle type="danger">&#xe60a;</i>
        </span>
        <!-- 下一首 -->
        <span @click="onEd">
          <i class="iconfont skip--forward" circle type="danger">&#xe60c;</i>
        </span>
      </div>
      <div class="mode">
        <p>{{ audio.currentTime | formatSecond }}</p>
        <!-- // 进度条ui -->
        <el-slider
          v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          class="slider"
        ></el-slider>
        <p>{{ audio.maxTime | formatSecond }}</p>

        <!-- //音量 -->
        <i @click="onMuted" class="iconfont 声音 音量 线性">&#xe72b;</i>
        <el-slider v-model="sliderVoice" @change="changeCurrentVoice" class="voice"></el-slider>
        <el-tooltip class="item" effect="dark" :content="tooltip" placement="top">
          <span v-if="order === 0" @click="onOrder">
            <i class="iconfont 顺序">&#xe72d;</i>
          </span>
          <span v-else-if="order === 1" @click="onOrder">
            <i class="iconfont 随机">&#xe600;</i>
          </span>
          <span v-else-if="order === 2" @click="onOrder">
            <i class="iconfont 循环">&#xe677;</i>
          </span>
        </el-tooltip>
        <span @click="showPlayList">
          <i class="iconfont 播放列表">&#xe60d;</i>
        </span>
      </div>
    </div>
    <div class="play-list" v-if="playListBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="播放列表" name="first">
          <div class="content">
            <el-table :data="songList" stripe :row-style="{ height: '10px' }" style="width: 100%">
              <el-table-column :show-overflow-tooltip="true" prop="name" label="歌曲标题" width>
                <template slot-scope="scope">
                  <span>
                    <span
                      :class="scope.row.index - 1 == index ? 'ontitle' : ''"
                    >{{ scope.row.name }}</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="ar" label="歌手" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <!-- {{ scope.row.ar }} -->
                  <span v-for="(item, index) in scope.row.ar" :key="'user-' + index">
                    {{ item.name
                    }}
                    <span
                      v-if="
                        scope.row.ar.length > 1 &&
                          index + 1 < scope.row.ar.length
                      "
                    >/</span>
                  </span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                :show-overflow-tooltip="true"
                prop="al.name"
                label="专辑"
              ></el-table-column>-->
              <el-table-column prop="dt" label="时长" width="60"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="second">
          <div class="content">
            <el-table :data="history" stripe :row-style="{ height: '10px' }" style="width: 100%">
              <el-table-column :show-overflow-tooltip="true" prop="name" label="歌曲标题"></el-table-column>
              <el-table-column prop="ar" label="歌手" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.ar" :key="'user-' + index">
                    {{ item.name
                    }}
                    <span
                      v-if="
                        scope.row.ar.length > 1 &&
                          index + 1 < scope.row.ar.length
                      "
                    >/</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="dt" label="时长" width="60"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}

export default {
  data() {
    return {
      audio: {
        url: "",
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,

        //当前音量
        volume: 1,
        maxVolume: 1,
        //是否静音
        muted: false,
      },
      //当前播放
      song: {
        ar: [
          {
            name: "",
          },
        ],
        al: {
          picUrl: "",
        },
      },
      songList: [
        // {
        //   id: 1,
        //   name: "盗墓笔记·十年人间", //歌名
        //   time: "", //时间
        //   artist: "李常超 (Lao乾妈)", //歌手
        //   album: "盗墓笔记·十年人间", //专辑
        //   cover:
        //     "https://p2.music.126.net/TdqG8yFWSZgQqH2K235MgA==/109951163434990771.jpg", //缩略图
        //   url:
        //     "http://m8.music.126.net/20200828101645/1660c4944707882cb24ce1d02e54c234/ymusic/6481/baf8/c6bb/b03e2666166539620a6a66c4cbe3ef01.mp3" //歌曲url
        // }
        // {
        //   url:
        //     "http://m8.music.126.net/20200828100019/c8b6f37d3b514dd38d0ae8e0b8568ca5/ymusic/035a/565c/0458/4031f384eaa6157ff49632a85e5290f0.mp3"
        // }
      ],
      //当前播放进度条
      sliderTime: 0,
      //当前音量进度条
      sliderVoice: 100,
      //当前播放列表下标
      index: 0,
      //歌单总数
      listCount: 0,

      //播放数序
      order: 0,
      //顺序提示
      tooltip: "顺序播放",

      //tab选择
      activeName: "first",
      //播放列表是否显示
      playListBox: false,
      //历史记录
      history: [],
    };
  },
  created() {
    this.listCount = this.songList.length;
    this.gerSongLrc();
  },
  methods: {
    // 更新当前播放数据
    setSong() {
      this.song = this.songList[this.index];
      console.log(this.song);
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    //加载音频
    load() {
      this.$refs.audio.load();
      //计时器是等资源加载出来
      setTimeout(() => {
        console.log(this);
        this.play();
      }, 150);
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    //播放完当前
    onEd() {
      // this.pause();
      console.log("播放完当前");
      this.listCount = this.songList.length;
      this.history.push(this.song);
      console.log(this.history);
      this.next();
      //计时器是等资源加载出来
      // setTimeout(() => {
      //   console.log(this);
      //   this.play();
      // }, 250);
    },
    //下一首
    next() {
      //判断播放顺序
      if (this.order === 0) {
        // this.tooltip = "顺序播放";
        //判断是否最后一首
        this.index = this.index === this.listCount - 1 ? 0 : (this.index += 1);
      } else if (this.order === 1) {
        // this.tooltip = "随机播放";
        this.index = parseInt(
          Math.random() * (0 - this.listCount) + this.listCount
        );
      } else if (this.order === 2) {
        // this.tooltip = "循环播放";
        this.index = this.index;
      }
      // ----------
      console.log(this.index);
      this.song = this.songList[this.index];
      console.log(this.song);
      this.getSongUrl(this.index);
    },
    //请求歌曲url
    async getSongUrl(index) {
      console.log("请求url");
      const id = this.song.id;
      const { data: res } = await this.$http.get("/song/url?id=" + id);
      this.audio.url = res.data[0].url;
      this.load();
      console.log(this.song);
    },
    //请求歌词
    async gerSongLrc() {
      const { data: res } = await this.$http.get("/lyric?id=1350160463");
      console.log(res);
    },
    //静音
    onMuted() {
      if (!this.muted) {
        this.$refs.audio.volume = 0;
        this.muted = true;
      } else {
        this.$refs.audio.volume = 1;
        this.muted = false;
      }
    },
    //播放顺序
    onOrder() {
      this.order = this.order === 2 ? 0 : (this.order += 1);
      if (this.order === 0) {
        this.tooltip = "顺序播放";
      } else if (this.order === 1) {
        this.tooltip = "随机播放";
      } else if (this.order === 2) {
        this.tooltip = "循环播放";
      }
    },
    //播放列表显示
    showPlayList() {
      this.playListBox = !this.playListBox;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log("timeupdate");
      // console.log(res);
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log("loadedmetadata");
      // console.log(res);
      this.audio.maxTime = parseInt(res.target.duration);
    },

    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },

    //音量
    // 拖动进度条，改变当前音量，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际数值
    // volume : 0-1之间
    changeCurrentVoice(index) {
      console.log(index);
      this.$refs.audio.volume = (index / 100).toFixed(1);
    },
    // 当音频当前时间改变后，进度条也要改变
    onVolumechange(res) {
      console.log(res);
      this.audio.volume = res.target.volume;
      this.sliderVoice = parseInt(
        (this.audio.volume / this.audio.maxVolume) * 100
      );
    },
  },
  beforeMount() {
    let self = this;

    //新
    this.$bus.on("playList", function (res) {
      console.log("list---");
      console.log(res);
      //先暂停
      self.pause();
      self.listCount = res.length;
      self.index = res.index;
      // self.song = res[res.index];
      self.songList = res;
      self.setSong();
      self.getSongUrl(res.index);
    });
    console.log(this);
  },
  mounted() {
    //搜索下拉隐藏
    document.body.addEventListener("click", () => {
      this.playListBox = false;
    });
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "play" : "pause";
    },
    //icon
    iconPlayPause(icon) {
      return icon ? "&#xe60a;" : "&#xe609;";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
};
</script>
<style lang="less" scoped>
.audio-module {
  z-index: 999;
  height: 55px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: rgb(255, 254, 254);
  box-shadow: 0 -0.14286rem 0.57143rem rgba(0, 0, 0, 0.2);
}
.audio-img {
  height: 40px;
  width: 40px;
  img {
    height: 40px;
    width: 40px;
    border: rgb(202, 203, 204) solid 0.5px;
  }
}
.audio-title {
  height: 40px;
  width: 150px;
  margin-left: 10px;
  p {
    margin: 0;
    padding: 0;
    font-size: 13px;
    line-height: 20px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p:nth-child(2) {
    color: rgb(102, 102, 102);
    font-size: 12px;
  }
}
.control {
  margin-left: 40px;
  .iconfont {
    border: rgb(235, 227, 227) solid 1px;
    border-radius: 50%;
    line-height: 50px;
  }
  span {
    margin: 0 10px;
  }
}
.mode {
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 18px;
  }
  span {
    margin-left: 10px;
  }
  p {
    font-size: 14px;
    text-align: center;
    margin: 0px 15px;
  }
  .slider {
    width: 450px;
  }
  .voice {
    width: 100px;
  }
}
// 播放列表
.play-list {
  z-index: 99;
  position: fixed;
  bottom: 61px;
  right: 0;
  height: 90%;
  width: 450px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.14286rem 0.57143rem 0 rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  .content {
    width: 95%;
    margin: 0 auto;
    .el-table {
      font-size: 12px;
    }
  }
  // 当前播放的标题
  .ontitle {
    color: red;
  }
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  padding: 10px 10px;
  font-style: normal;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
