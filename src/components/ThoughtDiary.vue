<template>
  <div class="thought-diary">
    <h1>Thought Diary</h1>
    <p>
      Use this thought diary to record and reflect on your thoughts.
      Categorizing and evaluating your thoughts can help you develop a more
      balanced perspective.
    </p>
    <div class="entry-form">
      <div class="form-group">
        <label for="thought">Thought:</label>
        <input type="text" id="thought" v-model="newThought.text" />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="newThought.category">
          <option disabled value="">Choose a category</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
      <button @click="addThought" :disabled="!isFormValid">Add Thought</button>
    </div>
    <div class="entries">
      <h2>Thoughts</h2>
      <div class="thought" v-for="(thought, index) in thoughts" :key="index">
        <div class="text">{{ thought.text }}</div>
        <div class="category">{{ thought.category }}</div>
        <div class="date">{{ thought.date }}</div>
        <button class="remove-btn" @click="removeThought(index)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ThoughtDiary",
  data() {
    return {
      newThought: {
        text: "",
        category: "",
        date: "",
      },
      thoughts: [],
      categories: [
        "Positive",
        "Negative",
        "Neutral",
        "Worry",
        "Gratitude",
        "Achievement",
        "Observation",
      ],
    };
  },
  computed: {
    isFormValid() {
      return this.newThought.text && this.newThought.category;
    },
  },
  methods: {
    async addThought() {
      if (this.isFormValid) {
        const thought = {
          text: this.newThought.text,
          category: this.newThought.category,
          date: new Date().toLocaleDateString(),
        };

        try {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
          const response = await axios.post(
            "http://localhost:5000/api/thoughts",
            thought,
            config
          );
          this.thoughts.push(response.data);
          this.newThought.text = "";
          this.newThought.category = "";
        } catch (error) {
          console.error("Error adding thought:", error);
        }
      }
    },

    async removeThought(index) {
      const thought = this.thoughts[index];
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
        await axios.delete(
          `http://localhost:5000/api/thoughts/${thought.id}`,
          config
        );
        this.thoughts.splice(index, 1);
      } catch (error) {
        console.error("Error removing thought:", error);
      }
    },
  },
  async created() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await axios.get(
        "http://localhost:5000/api/thoughts",
        config
      );
      this.thoughts = response.data;
    } catch (error) {
      console.error("Error fetching thoughts:", error);
    }
  },
};
</script>

<style scoped>
.thought-diary {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
}

h1,
h2 {
  color: #4a4a4a;
}

p {
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 30px;
}

.entry-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.form-group {
  margin-right: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 5px;
}

.entry-form input,
.entry-form select {
  width: 250px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  color: #4a4a4a;
}

.entry-form button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.entry-form button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

.entry-form button:hover:not(:disabled) {
  background-color: #3f8c40;
}

.entries {
  margin-top: 30px;
}

.thought {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: left;
}

.text {
  font-size: 18px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 10px;
}

.category {
  font-size: 16px;
  font-style: italic;
  color: #757575;
  margin-bottom: 10px;
}

.remove-btn {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

@media (min-width: 768px) {
  .entry-form {
    flex-wrap: nowrap;
  }
}
</style>
