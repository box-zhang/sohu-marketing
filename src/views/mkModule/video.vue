<template>
  <div class="video-box mt-bar">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOptions"
                  :playsinline="true">
    </video-player>
    <!-- <van-icon name="play-circle-o"
                size="2rem"
                color="white" /> -->
  </div>
</template>

<script>
// videojs -- videoPlayer 核心  

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css';
import 'videojs-contrib-hls' // 直播推流

import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'videoComponents',
  components: {
    videoPlayer,
  },
  data() {
    return {
      playerOptions: {
        playbackRates: this.playbackRates, // 播放速度
        autoplay: this.autoplay, // 如果true,浏览器准备好时开始回放。
        muted: this.muted, // 默认情况下将会消除任何音频。--- 不全屏播放的时候是否禁止声音外放
        loop: this.loop, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: this.language,
        aspectRatio: this.aspectRatio, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // sources: this.sources,
        sources: [{
          type: "video/mp4",
          src: require("@/assets/video/test.mp4")
        }],
        // poster: this.poster, // 你的封面地址
        poster: require("@/assets/video/test.jpeg"), // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: this.notSupportedMessage, // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: this.controlBar,
        hls: true,
      },
      // 记录当前播放时间
      nowPlayer: null,
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
  }
}
</script>

<style lang="less" scoped>
.video-box {
  position: relative;
  width: 100%;
  background: #eee;
  text-align: center;

  .van-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1rem;
    margin-left: -1rem;
  }

  .van-image {
    border-radius: 5px;
  }

  .vjs-custom-skin>.video-js .vjs-big-play-button {
    font-size: 1.6rem !important;
    border-radius: 1.6rem !important;
    width: 1.6rem !important;
    height: 1.6rem !important;
    margin-left: -0.8rem !important
  }
}
</style>
