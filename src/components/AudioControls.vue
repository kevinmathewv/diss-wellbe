<template>
  <div class="audio-controls">
    <audio ref="audioElement" :src="src" @ended="onAudioEnded"></audio>
    <button @click="togglePlayPause" class="play-pause-btn">
      {{ playPauseButtonText }}
    </button>
    <div class="progress-container">
      <div
        class="progress"
        :style="{ width: (currentTime / duration) * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioControls",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      playing: false,
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    playPauseButtonText() {
      return this.playing ? "Pause" : "Play";
    },
  },
  methods: {
    togglePlayPause() {
      if (this.playing) {
        this.$refs.audioElement.pause();
      } else {
        this.$refs.audioElement.play();
      }
      this.playing = !this.playing;
    },
    onAudioEnded() {
      this.playing = false;
      this.currentTime = 0;
      this.$emit("completed");
    },
  },
  mounted() {
    this.$refs.audioElement.addEventListener("timeupdate", () => {
      this.currentTime = this.$refs.audioElement.currentTime;
      this.duration = this.$refs.audioElement.duration;
    });
  },
  beforeUnmount() {
    this.$refs.audioElement.removeEventListener("timeupdate", () => {
      this.currentTime = this.$refs.audioElement.currentTime;
      this.duration = this.$refs.audioElement.duration;
    });
  },
};
</script>

<style scoped>
.audio-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.play-pause-btn {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.play-pause-btn:hover {
  background-color: #3f8c40;
}

.progress-container {
  width: 100%;
  height: 20px;
  background-color: #e8e8e8;
  border-radius: 10px;
  margin: 30px 0;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  transition: width 0.1s ease-out;
}
</style>
