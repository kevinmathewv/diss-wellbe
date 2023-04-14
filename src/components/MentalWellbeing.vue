<template>
  <div>
    <h1>Mental Wellbeing</h1>
    <p>
      Here you can find tools and resources to support your Mental wellbeing.
    </p>
    <div class="page-container">
      <h2>Categories</h2>
      <div class="category-tiles-container">
        <div class="category-tiles">
          <div
            class="category-tile category-button"
            v-for="(category, index) in categories"
            :key="index"
            @click="displayActivities(category)"
          >
            <div class="category-tile-icon">
              <img
                :src="
                  require(`../assets/icons/mental_wellbeing/${category.icon}.png`)
                "
                alt=""
                class="category-tile-icon"
              />
            </div>
            <div class="category-tile-title">{{ category.title }}</div>
          </div>
        </div>
      </div>

      <h2>Recommended Activities</h2>
      <div class="activity-tiles">
        <div
          class="activity-tile"
          v-for="(activity, index) in displayedActivities"
          :key="index"
          @click="navigateToActivity(activity)"
        >
          <img
            :src="
              require(`../assets/icons/mental_wellbeing/${activity.icon}.png`)
            "
            alt=""
            class="activity-tile-icon"
          />
          <div class="activity-tile-title">{{ activity.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MentalWellbeing",
  data() {
    return {
      activities: [
        {
          title: "Mindful breathing exercises",
          icon: "MBE",
          category: "Mindfulness and Relaxation",
        },
        {
          title: "Body scan meditation",
          icon: "BSM",
          category: "Mindfulness and Relaxation",
        },
        {
          title: "Mindful movement exercises",
          icon: "MME",
          category: "Mindfulness and Relaxation",
        },
        {
          title: "Progressive muscle relaxation",
          icon: "PMR",
          category: "Mindfulness and Relaxation",
        },
        {
          title: "Visualization exercises",
          icon: "VE",
          category: "Mindfulness and Relaxation",
        },
        {
          title: "Thought diary",
          icon: "TD",
          category: "Cognitive and Emotional",
        },
        {
          title: "Gratitude journaling",
          icon: "GJ",
          category: "Cognitive and Emotional",
        },
        {
          title: "Positive affirmation",
          icon: "PA",
          category: "Cognitive and Emotional",
        },
      ],
      categories: [
        {
          title: "Mindfulness and Relaxation",
          icon: "MR",
        },
        {
          title: "Cognitive and Emotional",
          icon: "CEW",
        },
      ],
      displayedActivities: [],
    };
  },
  mounted() {
    this.displayedActivities = this.activities;
  },
  methods: {
    displayActivities(category) {
      if (category) {
        this.displayedActivities = this.activities.filter(
          (activity) => activity.category === category.title
        );
      } else {
        this.displayedActivities = this.activities;
      }
    },
    //
    // if (activity.title === "Mindful Breathing") {
    //     this.$router.push({ name: "MindfulBreathing" });
    //   } else if (activity.title === "Mindful Meditation") {
    //     this.$router.push({ name: "MindfulMeditation" });
    //
    navigateToActivity(activity) {
      if (activity.title === "Mindful breathing exercises") {
        this.$router.push({ name: "MindfulBreathing" });
      } else if (activity.title === "Sleep Hygiene") {
        this.$router.push({ name: "SleepHygiene" });
      } else if (activity.title === "Healthy Diet") {
        this.$router.push({ name: "HealthyDiet" });
      } else if (activity.title === "Social Connection") {
        this.$router.push({ name: "SocialConnection" });
      } else if (activity.title === "Goal Setting") {
        this.$router.push({ name: "GoalSetting" });
      } else if (activity.title === "Habit Formation") {
        this.$router.push({ name: "HabitFormation" });
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background-color: #f2f2f2;
}

h1 {
  margin-top: 0;
  color: #3a3a3a;
}

h2 {
  color: #3a3a3a;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

a {
  color: #0077ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.category-tiles-container {
  margin-bottom: 20px;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.category-tiles-container::-webkit-scrollbar {
  height: 0em;
}

.category-tiles {
  display: inline-block;
  margin: 10px;
}

.category-tile {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 150px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.category-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.category-tile-icon {
  font-size: 40px;
  height: 50px;
  width: 50px;
  margin-bottom: 10px;
  color: #0077ff;
}

.category-tile-title {
  color: #3a3a3a;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 10px;
}

.activity-tiles {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
}

.activity-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 120px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.activity-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.activity-tile-icon {
  font-size: 40px;
  margin-bottom: 10px;
  height: 50px;
  width: 50px;
  color: #0077ff;
}

.activity-tile-title {
  color: #3a3a3a;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.page-container {
  padding-bottom: 70px; /* Adjust this value based on the height of your bottom navigation bar */
}

@media (max-width: 768px) {
  .category-tile,
  .activity-tile {
    width: 45%;
  }
}
</style>
