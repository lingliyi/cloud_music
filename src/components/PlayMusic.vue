<template>
  <div id="app">
    <aplayer :audio="audio" :lrcType="3" @getUrl="playMusic" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      audio: {
        name: "",
        artist: "",
        url: "",
        cover: '' // prettier-ignore
        // lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
      }
    };
  }
};
</script>
<style lang="less" scoped></style>
