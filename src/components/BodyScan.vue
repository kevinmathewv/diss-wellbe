<template>
  <div class="body-scan">
    <h1>Body Scan Meditation</h1>
    <p>
      In this exercise, you will practice body scan meditation to help you relax
      and increase body awareness. Click on each body part to receive specific
      meditation instructions.
    </p>
    <div v-if="selectedPart" class="meditation-instruction">
      <h2>{{ selectedPart.name }}</h2>
      <p>{{ selectedPart.instruction }}</p>
    </div>
    <div class="svg-container">
      <body-scan-svg @partSelected="onPartSelected" />
    </div>
  </div>
</template>

<script>
import BodyScanSvg from "./BodyScanSvg.vue";

export default {
  name: "BodyScan",
  components: {
    BodyScanSvg,
  },
  data() {
    return {
      selectedPart: null,
      bodyParts: [
        {
          id: "head",
          name: "Head",
          instruction: "Focus on your head and relax the muscles in your face.",
        },
        {
          id: "neck",
          name: "Neck",
          instruction:
            "Bring your attention to your neck and release any tension.",
        },
        {
          id: "shoulders",
          name: "Shoulders",
          instruction:
            "Concentrate on your shoulders and let them drop and relax.",
        },
      ],
    };
  },
  methods: {
    onPartSelected(id) {
      this.selectedPart = this.bodyParts.find((part) => part.id === id);
    },
  },
};
</script>

<style scoped>
.body-scan {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.svg-container {
  margin: 30px 0;
}

.meditation-instruction {
  text-align: left;
  font-size: 18px;
}
</style>
