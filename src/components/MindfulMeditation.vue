<template>
  <div class="mindfulness-meditation">
    <h1>Mindfulness Meditation</h1>
    <p>
      Practice mindfulness meditation to help reduce stress, anxiety, and
      depression. Select an exercise below and follow the guided instructions.
    </p>
    <div class="exercise-selection">
      <div
        class="exercise"
        v-for="(exercise, index) in exercises"
        :key="index"
        @click="selectExercise(index)"
      >
        {{ exercise.title }}
      </div>
    </div>
    <div v-if="selectedExercise !== null">
      <h2>{{ exercises[selectedExercise].title }}</h2>
      <p>{{ exercises[selectedExercise].description }}</p>
      <audio-controls
        :src="exercises[selectedExercise].audioSrc"
        @completed="markExerciseCompleted(selectedExercise)"
      ></audio-controls>
      <p v-if="isExerciseCompleted(selectedExercise)">
        Congratulations! You have completed this exercise.
      </p>
      <button @click="selectedExercise = null">Back to Exercises</button>
    </div>
  </div>
</template>

<script>
import AudioControls from "./AudioControls.vue";

export default {
  name: "MindfulMeditation",
  components: {
    AudioControls,
  },
  data() {
    return {
      selectedExercise: null,
      exercises: [
        {
          title: "Body Scan Meditation",
          description:
            "A guided body scan meditation to help you relax and become aware of your body.",
          audioSrc: "path/to/body_scan_audio.mp3",
          completed: false,
        },
        {
          title: "Breathing Meditation",
          description:
            "A guided breathing meditation to help you focus on your breath and calm your mind.",
          audioSrc: "path/to/breathing_meditation_audio.mp3",
          completed: false,
        },
        {
          title: "Loving Kindness Meditation",
          description:
            "A guided loving kindness meditation to cultivate compassion and love for yourself and others.",
          audioSrc: "path/to/loving_kindness_audio.mp3",
          completed: false,
        },
      ],
    };
  },
  methods: {
    selectExercise(index) {
      this.selectedExercise = index;
    },
    markExerciseCompleted(index) {
      this.exercises[index].completed = true;
    },
    isExerciseCompleted(index) {
      return this.exercises[index].completed;
    },
  },
};
</script>

<style scoped>
.mindfulness-meditation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.exercise-selection {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.exercise {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.exercise:hover {
  background-color: #3f8c40;
}
</style>
