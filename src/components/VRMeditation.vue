<!-- <template>
  <div id="vr-meditation">
    <div id="scene-selector" v-if="!selectedScene">
      <div
        v-for="(scene, index) in scenes"
        :key="index"
        class="scene-tile"
        @click="selectScene(scene)"
        :style="{
          backgroundImage: `url(${require('../assets/vr_assets/thumbails/' +
            scene.src +
            '.jpg')})`,
        }"
      >
        <h3>{{ scene.title }}</h3>
        <p>{{ scene.description }}</p>
      </div>
    </div>

    <a-scene v-else embedded ref="scene">
      <a-assets>
        <video
          id="skybox-video"
          :src="require(`../assets/vr_assets/${selectedScene.src}.mp4`)"
          loop
          crossorigin="null"
          preload="auto"
          ref="skyboxVideo"
          playsinline
        ></video>
      </a-assets>

      <a-videosphere
        ref="videosphere"
        src="#skybox-video"
        stereo="eye: left"
      ></a-videosphere>
      <a-entity camera look-controls position="0 1.6 3" stereo></a-entity>
    </a-scene>

    <div v-if="selectedScene" id="controls">
      <button @click="toggleVideo">{{ playing ? "Pause" : "Play" }}</button>
      <button @click="enterVR">Enter VR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRMeditation",
  data() {
    return {
      playing: false,
      selectedScene: null,
      scenes: [
        {
          title: "Sunrise",
          description:
            "Watch the sunrise from a scenic and calm location, with the soft hue of orange in the sky.",
          src: "sunrise",
        },
        {
          title: "Beachside",
          description:
            "Experience a relaxing day at the beach with soothing sounds of waves and seagulls in the background.",
          src: "beachside",
        },
        {
          title: "Waterfall",
          description:
            "Immerse yourself in the peacefulness of a waterfall surrounded by lush greenery.",
          src: "waterfall",
        },
        {
          title: "Coral Reef",
          description:
            "Dive into the deep blue ocean and explore a vibrant and colorful coral reef.",
          src: "coral_reef",
        },
        {
          title: "Paragliding",
          description:
            "Feel the thrill of soaring through the skies and enjoy stunning aerial views.",
          src: "paragliding",
        },
        {
          title: "Hot Air Balloon Journey",
          description:
            "Take a slow and peaceful journey high up in the sky in a hot air balloon.",
          src: "hot_air_balloon",
        },
        {
          title: "Waterfall Curtain",
          description:
            "Relax by a serene waterfall and let the sound of flowing water wash away your stress.",
          src: "waterfall_curtain",
        },
      ],
    };
  },
  mounted() {
    if (!("xr" in navigator)) {
      alert("WebXR is not supported in this browser.");
    }
  },
  methods: {
    selectScene(scene) {
      this.selectedScene = scene;
    },
    toggleVideo() {
      const skyboxVideo = this.$refs.skyboxVideo;
      if (skyboxVideo) {
        if (this.playing) {
          skyboxVideo.pause();
        } else {
          skyboxVideo.play();
        }
        this.playing = !this.playing;
      }
    },
    async enterVR() {
      const scene = this.$refs.scene;
      const skyboxVideo = this.$refs.skyboxVideo;
      console.log(scene);
      const videosphere = this.$refs.videosphere;
      if (scene) {
        skyboxVideo.play();
        this.playing = true;
        scene.enterVR();

        // Apply the stereo component
        if (videosphere) {
          videosphere.setAttribute("stereo", "");
        }
      }
    },
  },
};
</script>

<style scoped>
#vr-meditation {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}

#scene-selector {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.scene-tile {
  width: 100%;
  height: 30vh;
  margin: 1%;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.scene-tile:hover {
  opacity: 0.6;
}
.scene-tile p {
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  font-weight: bold;
  font-style: italic;
}

.scene-tile:hover h3 {
  text-decoration: underline;
  font-style: italic;
}

.scene-tile h3 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 2.5rem;
  font-weight: bold;
}

@media (min-width: 768px) {
  .scene-tile {
    width: 30%;
  }
}
#controls {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style> -->

<template>
  <div id="vr-meditation">
    <div id="scene-selector" v-if="!selectedScene">
      <div
        v-for="(scene, index) in scenes"
        :key="index"
        class="scene-tile"
        @click="selectScene(scene)"
        :style="{
          backgroundImage: `url(${require('../assets/vr_assets/thumbails/' +
            scene.src +
            '.jpg')})`,
        }"
      >
        <h3>{{ scene.title }}</h3>
        <p>{{ scene.description }}</p>
      </div>
    </div>

    <a-scene v-else embedded ref="scene">
      <a-assets>
        <video
          id="skybox-video"
          :src="require(`../assets/vr_assets/${selectedScene.src}.mp4`)"
          loop
          crossorigin="null"
          preload="auto"
          ref="skyboxVideo"
          playsinline
        ></video>
      </a-assets>

      <a-videosphere
        ref="videosphere"
        src="#skybox-video"
        stereo="eye: left"
      ></a-videosphere>
      <a-entity camera look-controls position="0 1.6 3" stereo></a-entity>
    </a-scene>

    <div v-if="selectedScene" id="controls">
      <div class="control-buttons">
        <div class="icon-background-back"></div>
        <div class="icon-button" @click="selectedScene = null">
          <img src="../assets/vr_assets/back_button.png" alt="Back button" />
        </div>

        <div class="icon-background-play"></div>
        <div class="icon-button" @click="toggleVideo">
          <img
            :src="
              playing
                ? require('../assets/vr_assets/pause.png')
                : require('../assets/vr_assets/play-button.png')
            "
            alt="play/pause button icon"
          />
        </div>

        <div class="icon-background-vr"></div>
        <div class="icon-button" @click="enterVR">
          <img
            :src="require('../assets/vr_assets/vr.png')"
            alt="enter VR button icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRMeditation",
  data() {
    return {
      playing: false,
      selectedScene: null,
      scenes: [
        {
          title: "Sunrise",
          description:
            "Watch the sunrise from a scenic and calm location, with the soft hue of orange in the sky.",
          src: "sunrise",
        },
        {
          title: "Beachside",
          description:
            "Experience a relaxing day at the beach with soothing sounds of waves and seagulls in the background.",
          src: "beachside",
        },
        {
          title: "Waterfall",
          description:
            "Immerse yourself in the peacefulness of a waterfall surrounded by lush greenery.",
          src: "waterfall",
        },
        {
          title: "Coral Reef",
          description:
            "Dive into the deep blue ocean and explore a vibrant and colorful coral reef.",
          src: "coral_reef",
        },
        {
          title: "Paragliding",
          description:
            "Feel the thrill of soaring through the skies and enjoy stunning aerial views.",
          src: "paragliding",
        },
        {
          title: "Hot Air Balloon Journey",
          description:
            "Take a slow and peaceful journey high up in the sky in a hot air balloon.",
          src: "hot_air_balloon",
        },
        {
          title: "Waterfall Curtain",
          description:
            "Relax by a serene waterfall and let the sound of flowing water wash away your stress.",
          src: "waterfall_curtain",
        },
      ],
    };
  },
  mounted() {
    if (!("xr" in navigator)) {
      alert("WebXR is not supported in this browser.");
    }
  },
  methods: {
    selectScene(scene) {
      this.selectedScene = scene;
    },
    toggleVideo() {
      const skyboxVideo = this.$refs.skyboxVideo;
      if (skyboxVideo) {
        if (this.playing) {
          skyboxVideo.pause();
        } else {
          skyboxVideo.play();
        }
        this.playing = !this.playing;
      }
    },
    async enterVR() {
      const scene = this.$refs.scene;
      const skyboxVideo = this.$refs.skyboxVideo;
      console.log(scene);
      const videosphere = this.$refs.videosphere;
      if (scene) {
        skyboxVideo.play();
        this.playing = true;
        scene.enterVR();

        // Apply the stereo component
        if (videosphere) {
          videosphere.setAttribute("stereo", "");
        }
      }
    },
  },
};
</script>

<style scoped>
#vr-meditation {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}

#scene-selector {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.scene-tile {
  width: 100%;
  height: 30vh;
  margin: 1%;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.scene-tile:hover {
  opacity: 0.6;
}
.scene-tile p {
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  font-weight: bold;
  font-style: italic;
}

.scene-tile:hover h3 {
  text-decoration: underline;
  font-style: italic;
}

.scene-tile h3 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 2.5rem;
  font-weight: bold;
}

@media (min-width: 768px) {
  .scene-tile {
    width: 30%;
  }
}

.control-buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
}

.icon-background-back {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 47px;
  height: 47px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.icon-background-play {
  position: absolute;
  top: 5px;
  left: 60px;
  width: 47px;
  height: 47px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.icon-background-vr {
  position: absolute;
  top: 5px;
  left: 116px;
  width: 47px;
  height: 47px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 3px;
}

.icon-button img {
  width: 40px;
  height: 40px;
  display: block;
  z-index: 15;
}
.a-enter-vr-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
