<template>
  <div>
    <h1>Lifestyle Wellbeing</h1>
    <p>
      Here you can find tools and resources to support your lifestyle wellbeing.
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
            <div class="category-tile-icon">{{ category.icon }}</div>
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
          <div class="activity-tile-icon">{{ activity.icon }}</div>
          <div class="activity-tile-title">{{ activity.title }}</div>
        </div>
      </div>

      <!-- <h2>Resources</h2>
      <p>
        Here are some resources you can use to get more information and support:
      </p>
      <ul>
        <li>
          <a href="https://www.who.int/">World Health Organization (WHO)</a>
        </li>
        <li>
          <a href="https://www.cdc.gov/"
            >Centers for Disease Control and Prevention (CDC)</a
          >
        </li>
        <li>
          <a href="https://www.hsph.harvard.edu/nutritionsource/"
            >Harvard School of Public Health - The Nutrition Source</a
          >
        </li>
        <li>
          <a href="https://www.sleepfoundation.org/"
            >National Sleep Foundation</a
          >
        </li>
        <li>
          <a href="https://www.acefitness.org/">American Council on Exercise</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "LifestyleWellbeing",
  data() {
    return {
      activities: [
        {
          title: "Physical Activity Tracking",
          icon: "PAT",
          category: "Exercise",
        },
        {
          title: "Sleep Hygiene",
          icon: "SH",
          category: "Sleep",
        },
        {
          title: "Healthy Diet",
          icon: "HD",
          category: "Nutrition",
        },
        {
          title: "Social Connection",
          icon: "SC",
          category: "Relationships",
        },
        {
          title: "Goal Setting",
          icon: "GS",
          category: "Personal Development",
        },
        {
          title: "Habit Formation",
          icon: "HF",
          category: "Personal Development",
        },
      ],
      categories: [
        {
          title: "Exercise",
          icon: "E",
        },
        {
          title: "Nutrition",
          icon: "N",
        },
        {
          title: "Sleep",
          icon: "S",
        },
        {
          title: "Relationships",
          icon: "R",
        },
        {
          title: "Personal Development",
          icon: "PD",
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
      if (activity.title === "Physical Activity Tracking") {
        this.$router.push({ name: "PhysicalActivityTracking" });
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
  width: 80px;
  height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  transition: all 0.3s ease;
}

.category-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.category-tile-icon {
  font-size: 40px;
  margin-bottom: 10px;
  color: #0077ff;
}

.category-tile-title {
  color: #3a3a3a;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
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
