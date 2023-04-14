<template>
  <b-alert
    dismissible
    style="
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 9999;
      border-radius: 0px;
    "
    :variant="alertType"
    :show="showAlert"
    >{{ alertText }}</b-alert
  >
  <div class="dashboard">
    <h3>Dashboard</h3>
    <button type="submit" @click.prevent="onExportCSV" class="btn btn-success">
      Export Tracker and Logs as CSV
    </button>

    <h3>Your trackers:</h3>
    <div v-if="trackers != []">
      <div v-for="tracker in trackers" :key="tracker.id">
        <b-card>
          <b-card-title>{{ tracker.name }}</b-card-title>
          <b-card-description> {{ tracker.description }}</b-card-description>
          <b-card-text>
            <p>
              <b>Last reviewed on:</b
              ><i v-if="tracker.last_review != null">{{
                tracker.last_review
              }}</i
              ><i v-else> This tracker has no logs</i>
            </p>
            <p>
              <b>Last logged value:</b
              ><i v-if="tracker.last_value != null">{{ tracker.last_value }}</i
              ><i v-else> This tracker has no logs</i>
            </p>
            <!-- <div v-if="barLoaded[tracker.id]"> -->
            <!-- <vue-bar-graph
              /> -->
            <!-- </div> -->
            <div v-if="trendLoaded[tracker.id]">
              <TrendChart
                :datasets="[
                  {
                    data: trend_y[tracker.id],
                    smooth: false,
                    fill: true,
                  },
                ]"
                :grid="{
                  verticalLines: true,
                  horizontalLines: true,
                }"
                :labels="{
                  xLabels: trend_x[tracker.id],
                  yLabels: 5,
                }"
                :min="0"
              >
              </TrendChart>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <div v-else><p>You have not created a tracker yet!</p></div>
  </div>
</template>

<script>
// import VueBarGraph from "vue-bar-graph";
import axios from "axios";
export default {
  // eslint-disable-next-line
  name: "Dashboard",
  data: function () {
    return {
      showAlert: false,
      alertText: null,
      trendLoaded: [],
      trackers: null,
      logs: null,
      trend_x: [],
      trend_y: [],
      bar_mcq: [],
    };
  },
  methods: {
    async onExportCSV() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get("http://localhost:5000/api/csv", config)
        .then((response) => {
          this.showAlert = true;
          this.alertText = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async created() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    await axios
      .get("http://localhost:5000/api/tracker", config)
      .then((response) => {
        this.trackers = response.data;
        response.data.forEach(async (tracker) => {
          if (tracker.type == "mcq") {
            this.bar_mcq[tracker.id] = {};
          }
          this.trend_x[tracker.id] = [];
          this.trend_y[tracker.id] = [];

          let formData = {
            tracker_name: tracker.name,
          };
          await axios
            .post("http://localhost:5000/api/trackerLogs", formData, config)
            .then((response) => {
              response.data.forEach((log) => {
                if (tracker.type == "mcq") {
                  // this.bar_mcq[tracker.id][log.value] = 2;
                  this.bar_mcq[tracker.id][log.value] =
                    (this.bar_mcq[tracker.id][log.value] || 0) + 1;
                } else {
                  this.trend_x[tracker.id].push(log.timestamp);
                  this.trend_y[tracker.id].push(parseFloat(log.value));
                }
              });
              this.alertText = response.data.message;
              // console.log(response);
            })
            .catch((error) => {
              // this.alertText = error.response.data.message;
              console.log(error);
            });
          if (tracker.type == "mcq") {
            console.log(this.bar_mcq);
            this.trend_x[tracker.id] = Object.keys(this.bar_mcq[tracker.id]);
            this.trend_y[tracker.id] = Object.values(this.bar_mcq[tracker.id]);
          }
          // console.log(this.trend_x[tracker.id]);
          // console.log(this.trend_y[tracker.id]);
          if (this.trend_x[tracker.id].length > 1) {
            this.trendLoaded[tracker.id] = true;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    // VueBarGraph,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
