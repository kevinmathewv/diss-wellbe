<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
      <h1>Welcome to Wellbeing App</h1>
      <h3>Onboarding:</h3>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: progress + '%' }"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span
            class="progress-label"
            :class="{ 'text-white': currentQuestion === 1 }"
            >{{ currentQuestion }} of {{ totalQuestions }}</span
          >
        </div>
      </div>
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">
            {{ currentQuestion }}. {{ currentQuestionText }}
          </h5>
          <div
            class="form-check"
            v-for="(option, index) in currentQuestionOptions"
            :key="index"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="`question-${currentQuestion}`"
              :id="`question-${currentQuestion}-${index}`"
              :value="option"
              v-model="currentAnswer"
            />
            <label
              class="form-check-label"
              :for="`question-${currentQuestion}-${index}`"
            >
              {{ option }}
            </label>
          </div>
        </div>
      </div>
      <div class="btn-group" role="group" aria-label="Navigation buttons">
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="currentQuestion === 1"
          @click="previousQuestion"
        >
          Previous
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!currentAnswer"
          @click="nextQuestion"
        >
          {{ currentQuestion === totalQuestions ? "Finish" : "Next" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OnBoarding",
  data() {
    return {
      totalQuestions: 4,
      progress: 25,
      currentQuestion: 1,
      questions: [
        {
          text: "What is your age?",
          options: [
            "Under 18",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65 or older",
          ],
        },
        {
          text: "How often do you exercise?",
          options: [
            "Never",
            "Less than once a week",
            "1-2 times a week",
            "3-4 times a week",
            "5 or more times a week",
          ],
        },
        {
          text: "How often do you eat fruits and vegetables?",
          options: [
            "Never",
            "Less than once a day",
            "1-2 times a day",
            "3-4 times a day",
            "5 or more times a day",
          ],
        },
        {
          text: "How would you rate your stress level?",
          options: ["Low", "Moderate", "High", "Very high"],
        },
      ],
      currentAnswer: "",
    };
  },
  computed: {
    currentQuestionText() {
      return this.questions[this.currentQuestion - 1].text;
    },
    currentQuestionOptions() {
      return this.questions[this.currentQuestion - 1].options;
    },
  },
  methods: {
    previousQuestion() {
      if (this.currentQuestion > 1) {
        this.currentQuestion--;
        this.currentAnswer = "";
        this.progress = (this.currentQuestion / this.totalQuestions) * 100;
      }
    },
    nextQuestion() {
      if (this.currentAnswer) {
        // Update progress and move to next question or dashboard
        this.currentQuestion += 1;
        this.currentAnswer = "";
        this.progress = (this.currentQuestion / this.totalQuestions) * 100;
        if (this.currentQuestion > this.totalQuestions) {
          this.$router.push("/dashboard");
        }
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.progress-label {
  font-size: 0.8rem;
  font-weight: bold;
}

.text-white {
  color: #ffffff;
}
</style>
