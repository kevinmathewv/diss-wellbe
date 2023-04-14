<template>
  <div class="wellbeing-chat">
    <h2>Wellbeing Chat</h2>

    <!-- Add the chat container -->
    <div class="chat-container">
      <!-- Add chat messages -->
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        class="chat-message"
        :class="message.type"
        @click="navigateToActivity(message.path)"
      >
        {{ message.content }}
      </div>
    </div>

    <!-- Replace the textarea with an input field -->
    <div class="input-container">
      <input
        v-model="userInput"
        @input="errorMessage = ''"
        @keyup.enter="getEmotionAndRecommendation"
      />
      <button @click="getEmotionAndRecommendation">Submit</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WellbeingChat",
  computed: {
    suggestedActivities() {
      const activities = {
        "Stress and anxiety": [
          { name: "Mindful breathing exercises", path: "/mindful-breathing" },
          { name: "Body scan meditation", path: "/body-scan" },
          { name: "Progressive muscle relaxation", path: "/mindful-breathing" },
          { name: "Visualization exercises", path: "/mindful-breathing" },
        ],
        "Negative thoughts and emotions": [
          { name: "Thought diary", path: "/mindful-breathing" },
          { name: "Gratitude journaling", path: "/mindful-breathing" },
          { name: "Positive affirmation", path: "/mindful-breathing" },
        ],
        "Physical discomfort and tension": [
          { name: "Mindful movement exercises", path: "/mindful-breathing" },
          { name: "Taking a walk after meals", path: "/mindful-breathing" },
          { name: "Trying a new exercise", path: "/mindful-breathing" },
        ],
        "Low energy and fatigue": [
          { name: "Standing every hour", path: "/mindful-breathing" },
          {
            name: "Use stairs instead of elevator",
            path: "/mindful-breathing",
          },
          { name: "Getting enough sleep", path: "/mindful-breathing" },
        ],
        "Lifestyle and habits": [
          { name: "Reducing screen time", path: "/mindful-breathing" },
          { name: "Increasing water intake", path: "/mindful-breathing" },
          { name: "Eating plant-based meals", path: "/mindful-breathing" },
          { name: "Reducing alcohol consumption", path: "/mindful-breathing" },
        ],
      };

      return this.recommendation ? activities[this.recommendation] : [];
    },
  },
  data() {
    return {
      userInput: "",
      emotion: "",
      recommendation: "",
      errorMessage: "",
      chatMessages: [],
    };
  },
  methods: {
    async getEmotionAndRecommendation() {
      try {
        const response = await axios.post("http://localhost:5000/api/emotion", {
          user_input: this.userInput,
        });
        if (response.data.success) {
          this.recommendation = response.data.recommendation;
          this.chatMessages.push({ type: "user", content: this.userInput });
          this.chatMessages.push({
            type: "bot",
            content:
              "FOR DEVELOPER PURPOSES: Detected emotion: " +
              this.recommendation,
          });
          this.chatMessages.push({
            type: "bot",
            content:
              "Hey! How about trying one of these methods enhance your wellbeing?",
          });
          this.suggestedActivities.forEach((activity) => {
            this.chatMessages.push({
              type: "bot",
              content: activity.name,
              path: activity.path,
            });
          });
          this.userInput = "";
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = "An error occurred while processing your request.";
      }
    },
    navigateToActivity(path) {
      if (path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  overflow-y: auto;
  max-height: 400px;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message.user {
  color: #4caf50;
  font-weight: bold;
}

.chat-message.bot {
  color: #3e8e41;
}

.input-container {
  display: flex;
}

input {
  flex-grow: 1;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}
.wellbeing-chat {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  resize: none;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.error {
  color: red;
}
.suggested-activities {
  margin-top: 20px;
}

.activity-tile {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  cursor: pointer;
}

.activity-tile:hover {
  background-color: #3f8c40;
}
</style>
