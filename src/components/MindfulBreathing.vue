  <template>
  <div class="mindful-breathing">
    <h1>Mindful Breathing Exercise</h1>
    <p>
      In this exercise, you will practice mindful breathing to help you focus
      and relax. Follow the instructions below:
    </p>
    <div v-if="!exerciseStarted">
      <div class="step-container">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-description">{{ step }}</div>
        </div>
      </div>
      <button @click="startStopExercise" class="start-stop-btn">
        {{ exerciseButtonText }}
      </button>
    </div>
    <div v-if="exerciseStarted">
      <div class="current-step">
        {{ steps[step] }}
      </div>
      <button
        @click="previousStep"
        :disabled="step === 0"
        class="step-navigation-btn"
      >
        Previous
      </button>
      <button
        @click="nextStep"
        :disabled="step === steps.length - 1"
        class="step-navigation-btn"
      >
        Next
      </button>
      <button @click="startStopExercise" class="start-stop-btn">
        {{ exerciseButtonText }}
      </button>
      <div class="progress-container">
        <div
          :class="[
            'progress',
            {
              'progress-red': timeUp && !exerciseCompleted,
              'progress-green': exerciseCompleted,
            },
          ]"
          :style="{
            width: (1 - timer / 400) * 100 + '%',
            backgroundColor: progressBarColor,
          }"
        ></div>
      </div>
      <div v-if="timeUp && !exerciseCompleted" class="time-up-notification">
        Time's up!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MindfulBreathing",
  data() {
    return {
      exerciseDuration: 120, // Exercise duration in seconds
      exerciseStarted: false,
      progress: 0,
      interval: null,
      step: 0,
      timer: 0,
      timeUp: false,
      exerciseCompleted: false,
      intervalId: null,
      steps: [
        "Find a comfortable seated position.",
        "Close your eyes or focus on a point in front of you.",
        "Breathe in slowly and deeply through your nose for a count of 4.",
        "Hold your breath for a count of 4.",
        "Exhale slowly through your mouth for a count of 4.",
        "Hold your breath for a count of 4.",
        "Repeat the cycle for the duration of the exercise.",
      ],
      currentStepIndex: 0,
    };
  },
  computed: {
    exerciseButtonText() {
      return this.exerciseStarted ? "Stop Exercise" : "Start Exercise";
    },
    currentStepDescription() {
      return this.steps[this.currentStepIndex];
    },
    progressBarColor() {
      if (this.exerciseCompleted) {
        return "#f44336";
      } else if (this.timeUp) {
        return "#ff5252";
      } else {
        return "#4caf50";
      }
    },

    exerciseInProgress() {
      return this.exerciseStarted && !this.exerciseCompleted;
    },
  },
  methods: {
    startStopExercise() {
      if (this.exerciseInProgress) {
        clearInterval(this.interval);
      } else {
        this.startExercise();
      }
      this.exerciseStarted = !this.exerciseStarted;
    },
    startExercise() {
      const startTime = Date.now();
      this.intervalId = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        this.progress = (elapsedTime / this.exerciseDuration) * 100;
        this.currentStepIndex = Math.floor((elapsedTime % 16) / 4);
        if (elapsedTime >= this.exerciseDuration) {
          clearInterval(this.interval);
          this.completeExercise();
        }
      }, 100);
    },
    updateTimer() {
      if (this.step >= 2 && this.step <= 5) {
        this.timer = 400;
        this.interval = setInterval(() => {
          this.timer--;
          if (this.timer === 0) {
            clearInterval(this.interval);
            this.timeUp = true;
            if (!this.exerciseCompleted) {
              this.completeExercise();
            }
          }
          // Adjust progress bar calculation based on current step
          this.progress =
            ((this.step + (400 - this.timer) / 400) / this.steps.length) * 100;
        }, 10);
      } else {
        if (this.timer !== 0) {
          this.timer = 0;
          this.timeUp = false;
        }
        // Reset progress bar when user navigates between steps
        this.progress = 0;
      }
    },

    nextStep() {
      if (this.step < this.steps.length - 1) {
        clearInterval(this.intervalId); // add this line
        this.step++;
        this.updateTimer();
        this.resetProgressBar(); // Reset progress bar
      }
    },

    previousStep() {
      if (this.step > 0) {
        clearInterval(this.intervalId); // add this line
        this.step--;
        this.updateTimer();
        this.resetProgressBar(); // Reset progress bar
      }
    },

    completeExercise() {
      this.exerciseCompleted = true;
      this.progress = 100;
    },
    resetProgressBar() {
      this.progress = 0;
      this.timeUp = false;
      this.exerciseCompleted = false;
    },
  },
};
</script>

<style scoped>
.mindful-breathing {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
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

.progress-red {
  background-color: #f44336;
}

.progress-green {
  background-color: #4caf50;
}

.time-up-notification {
  color: #f44336;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.start-stop-btn {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-stop-btn:hover {
  background-color: #3f8c40;
}

.step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.step {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.current-step {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.step-navigation-btn {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
}

.step-navigation-btn:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

.time-up-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff5252;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  opacity: 0;
  animation: fadeInOut 4s ease forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
