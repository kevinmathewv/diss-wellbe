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
  <div class="manageTracker">
    <h3>Manage Trackers</h3>

    <div>
      <b-card
        style="max-width: 50rem"
        class="border-success text-center mb-3 mx-auto"
      >
        <b-card-title>Add a new tracker:</b-card-title>
        <p>
          <input
            v-model="tracker_name"
            type="text"
            name="tracker_name"
            placeholder="Enter Tracker name"
          />
          <input
            v-model="tracker_desc"
            type="text"
            name="tracker_desc"
            placeholder="Enter Tracker Description"
          />
        </p>
        <b-form-select
          v-model="tracker_type"
          :options="tracker_types"
          size="sm"
          class="mt-3"
        ></b-form-select>
        <b-form-input
          v-if="tracker_type == 'mcq'"
          id="username"
          v-model="tracker_choices"
          placeholder="Enter Tracker Choices separated by comma"
        ></b-form-input>
        <button
          type="submit"
          @click.prevent="onCreateTracker"
          class="btn btn-primary"
        >
          Create Tracker
        </button>
      </b-card>
      <h3>Your trackers:</h3>
      <div v-for="tracker in trackers" :key="tracker.id">
        <b-card>
          <b-card-title>{{ tracker.name }}</b-card-title>

          <b-card-description>
            <b>Tracker Description: </b>{{ tracker.description }} |
            <b>Tracker Type: </b>{{ tracker.type }}</b-card-description
          >
          <b v-if="tracker.choices != null"> | Tracker Choices: </b>
          {{ tracker.choices }}
          <p>
            <button
              type="submit"
              @click.prevent="
                editTrackerRequest[tracker.id] = !editTrackerRequest[tracker.id]
              "
              class="btn btn-warning"
            >
              Edit Tracker
            </button>
            <button
              type="submit"
              @click.prevent="onDeleteTracker(tracker.name)"
              class="btn btn-danger"
            >
              Delete Tracker
            </button>
          </p>
          <div v-if="editTrackerRequest[tracker.id]">
            <b-card
              style="max-width: 50rem"
              class="border-success text-center mb-3 mx-auto"
            >
              <p>
                <input
                  v-model="tracker_name_arr[tracker.id]"
                  type="text"
                  name="tracker_name_arr"
                  placeholder="Enter New Tracker name"
                />
                <input
                  v-model="tracker_desc_arr[tracker.id]"
                  type="text"
                  name="tracker_desc_arr"
                  placeholder="Enter New Tracker Description"
                />
              </p>
              <b-form-select
                style="
                  margin: auto;
                  width: 50%;
                  border: 3px solid green;
                  padding: 10px;
                "
                v-model="tracker_type_arr[tracker.id]"
                :options="tracker_types"
                class="mt-3"
              ></b-form-select>
              <b-form-input
                v-if="tracker_type_arr[tracker.id] == 'mcq'"
                id="username"
                v-model="tracker_choices_arr[tracker.id]"
                placeholder="Enter Tracker Choices separated by comma"
              ></b-form-input>
              <button
                type="submit"
                @click.prevent="onModifyTracker(tracker.name, tracker.id)"
                class="btn btn-warning"
              >
                Modify Tracker
              </button>
            </b-card>
          </div>

          <p>
            <input
              v-model="value[tracker.id]"
              v-if="tracker.type == 'numerical'"
              style="width: 300px"
              type="text"
              name="value"
              placeholder="Enter Log Value"
            />
            <input
              v-model="value[tracker.id]"
              v-if="tracker.type == 'duration'"
              style="width: 300px"
              type="text"
              name="value"
              placeholder="Enter Duration in Minutes"
            />
            <input
              v-model="value[tracker.id]"
              v-if="tracker.type == 'mcq'"
              style="width: 300px"
              type="text"
              name="value"
              placeholder="Enter a log value from given choices"
            />
            <input
              v-model="note[tracker.id]"
              style="width: 300px"
              type="text"
              name="note"
              placeholder="Enter a note for the Log"
            />
          </p>
          <button
            type="submit"
            @click.prevent="onCreateLog(tracker.name, tracker.id)"
            class="btn btn-primary"
          >
            Create Log
          </button>

          <b-card-text v-if="logs != []">
            <div>
              <ol v-for="log in logs" :key="log.id">
                <li v-if="log.tracker_id == tracker.id">
                  <b>{{ log.timestamp }}</b
                  >:- <b>Logged Value: </b> {{ log.value }}, <b>Note: </b>
                  {{ log.note }}
                  <button
                    type="submit"
                    @click.prevent="
                      editLogRequest[log.id] = !editLogRequest[log.id]
                    "
                    class="btn btn-warning"
                  >
                    Edit Log
                  </button>
                  <button
                    type="submit"
                    @click.prevent="onDeleteLog(log.id)"
                    class="btn btn-danger"
                  >
                    Delete Log
                  </button>
                  <div v-if="editLogRequest[log.id]">
                    <b-card
                      style="max-width: 50rem"
                      class="border-success text-center mb-3 mx-auto"
                    >
                      <h6>Modify Log Value and Note:</h6>
                      <p>
                        <input
                          v-model="value_arr[log.id]"
                          v-if="tracker.type == 'numerical'"
                          style="width: 300px"
                          type="text"
                          name="value_arr"
                          placeholder="Enter Log Value"
                        />
                        <input
                          v-model="value_arr[log.id]"
                          v-if="tracker.type == 'duration'"
                          style="width: 300px"
                          type="text"
                          name="value_arr"
                          placeholder="Enter Duration in minutes"
                        />
                        <input
                          v-model="value_arr[log.id]"
                          v-if="tracker.type == 'mcq'"
                          style="width: 300px"
                          type="text"
                          name="value_arr"
                          placeholder="Choose a value from the choices"
                        />
                        <input
                          v-model="note_arr[log.id]"
                          style="width: 300px"
                          type="text"
                          name="note_arr"
                          placeholder="Enter Note Value"
                        />
                      </p>

                      <h6>Modify Timestamp's Individual Elements:</h6>

                      <input
                        v-model="year_arr[log.id]"
                        type="text"
                        name="year_arr"
                        placeholder="Enter Year Value"
                      />
                      <input
                        v-model="month_arr[log.id]"
                        type="text"
                        name="month_arr"
                        placeholder="Enter Month Value"
                      />
                      <input
                        v-model="day_arr[log.id]"
                        type="text"
                        name="day_arr"
                        placeholder="Enter Day Value"
                      />
                      <input
                        v-model="hour_arr[log.id]"
                        type="text"
                        name="hour_arr"
                        placeholder="Enter Hour Value"
                      />
                      <input
                        v-model="minute_arr[log.id]"
                        type="text"
                        name="minute_arr"
                        placeholder="Enter Minute Value"
                      />
                      <input
                        v-model="second_arr[log.id]"
                        type="text"
                        name="second_arr"
                        placeholder="Enter Second Value"
                      />
                      <input
                        v-model="microsecond_arr[log.id]"
                        type="text"
                        name="microsecond_arr"
                        placeholder="Enter Microsecond Value"
                      />
                      <p>
                        <button
                          type="submit"
                          @click.prevent="onModifyLog(log.id)"
                          class="btn btn-warning"
                        >
                          Modify Log
                        </button>
                      </p>
                    </b-card>
                  </div>
                </li>
              </ol>
            </div>
          </b-card-text>
          <div v-else>
            <i>You are yet to log to this tracker!</i>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line
  name: "ManageTracker",
  data: function () {
    return {
      editLogRequest: [],
      editTrackerRequest: [],
      showAlert: false,
      alertType: "success",
      alertText: null,
      trackers: null,
      logs: null,
      value: [],
      note: [],
      value_arr: [],
      note_arr: [],
      year_arr: [],
      month_arr: [],
      day_arr: [],
      hour_arr: [],
      minute_arr: [],
      second_arr: [],
      microsecond_arr: [],
      tracker_name_arr: [],
      tracker_desc_arr: [],
      tracker_type_arr: [],
      tracker_choices_arr: [],
      tracker_name: null,
      tracker_desc: null,
      tracker_type: null,
      tracker_choices: null,
      tracker_types: [
        { value: null, text: "Please choose tracker type" },
        { value: "mcq", text: "Multiple Choice Type Value" },
        { value: "numerical", text: "Numerical Value" },
        { value: "duration", text: "Time Duration Value" },
      ],
    };
  },
  methods: {
    async getTrackersAndLogs() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios
        .get("http://localhost:5000/api/tracker", config)
        .then((response) => {
          this.trackers = response.data;
          // console.log(this.trackers);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/api/logs", config)
        .then((response) => {
          this.logs = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async onCreateTracker() {
      if (this.tracker_type != "mcq") {
        this.tracker_choices = null;
      }
      let formData = {
        tracker_name: this.tracker_name,
        tracker_desc: this.tracker_desc,
        tracker_type: this.tracker_type,
        tracker_choices: this.tracker_choices,
      };
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      console.log(config);
      await axios
        .post("http://localhost:5000/api/tracker", formData, config)
        .then((response) => {
          // this.$router.push('/login');
          this.showAlert = true;
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
          // console.log(response);
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
          // console.log(error);
        });
    },

    async onCreateLog(tracker_name, tracker_id) {
      let formData = {
        value: this.value[tracker_id],
        note: this.note[tracker_id],
        tracker_name: tracker_name,
      };
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      console.log(config);
      await axios
        .post("http://localhost:5000/api/logs", formData, config)
        .then((response) => {
          // this.$router.push('/login');
          (this.value = []), (this.note = []), (this.showAlert = true);
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
          // console.log(response);
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
          // console.log(error);
        });
    },

    async onDeleteTracker(tracker_name) {
      await axios
        .delete("http://localhost:5000/api/tracker", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            tracker_name: tracker_name,
          },
        })
        .then((response) => {
          this.showAlert = true;
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
        });
    },

    async onModifyTracker(current_tracker_name, tracker_id) {
      let formData = {
        current_tracker_name: current_tracker_name,
        new_tracker_name: this.tracker_name_arr[tracker_id],
        new_tracker_desc: this.tracker_desc_arr[tracker_id],
        new_tracker_type: this.tracker_type_arr[tracker_id],
        new_tracker_choices: this.tracker_choices_arr[tracker_id],
      };
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      console.log(config);
      await axios
        .put("http://localhost:5000/api/tracker", formData, config)
        .then((response) => {
          // this.$router.push('/login');
          this.showAlert = true;
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
          // console.log(response);
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
          // console.log(error);
        });
    },

    async onDeleteLog(log_id) {
      await axios
        .delete("http://localhost:5000/api/logs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            log_id: log_id,
          },
        })
        .then((response) => {
          this.showAlert = true;
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
        });
    },

    async onModifyLog(log_id) {
      let formData = {
        log_id: log_id,
        value: this.value_arr[log_id],
        note: this.note_arr[log_id],
        year: this.year_arr[log_id],
        month: this.month_arr[log_id],
        day: this.day_arr[log_id],
        hour: this.hour_arr[log_id],
        minute: this.minute_arr[log_id],
        second: this.second_arr[log_id],
        microsecond: this.microsecond_arr[log_id],
      };
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      console.log(config);
      await axios
        .put("http://localhost:5000/api/logs", formData, config)
        .then((response) => {
          // this.$router.push('/login');
          this.showAlert = true;
          this.alertType = "success";
          this.alertText = response.data.message;
          this.getTrackersAndLogs();
          // console.log(response);
        })
        .catch((error) => {
          this.showAlert = true;
          this.alertType = "danger";
          this.alertText = error.response.data.message;
          console.log(error);
        });
    },
  },
  created() {
    this.getTrackersAndLogs();
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
