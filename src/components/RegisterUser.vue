<template>
  <div>
    <b-alert variant="danger" :show="invalidCredentials">{{
      errorText
    }}</b-alert>
    <h1>Welcome to Wellbeing App</h1>
    <h3>Create a new account:</h3>
    <div class="row justify-content-md-center">
      <div class="col-lg-4">
        <b-container fluid>
          <b-row class="my-1">
            <b-form-group
              id="username"
              description="Choose a username with atleast 5 characters."
              label="Enter your username."
              label-for="username"
              valid-feedback="Valid Username"
              :invalid-feedback="invalidUsername"
              :state="state_username"
            >
              <b-form-input
                id="username"
                v-model="username"
                :state="state_username"
                trim
              ></b-form-input>
            </b-form-group>
          </b-row>
          <b-row class="my-1">
            <b-form-group
              id="email"
              description="Enter a valid Email Address."
              label="Enter your Email ID"
              label-for="email"
              valid-feedback="Valid Email ID"
              :invalid-feedback="invalidEmail"
              :state="state_email"
            >
              <b-form-input
                class="form-control form-control-lg"
                id="email"
                type="email"
                v-model="email"
                :state="state_email"
              ></b-form-input>
            </b-form-group>
          </b-row>
          <b-row class="my-1">
            <b-form-group
              id="password"
              description="Password needs atleast 8 characters including an uppercase character and a number."
              label="Enter your Password."
              label-for="password"
              valid-feedback="Valid Password!"
              :invalid-feedback="invalidPassword"
              :state="state_password"
            >
              <b-form-input
                id="password"
                type="password"
                v-model="password"
                :state="state_password"
              ></b-form-input>
            </b-form-group>
          </b-row>
          <b-row>
            <button
              type="submit"
              @click.prevent="onSubmit"
              class="btn btn-primary"
            >
              Register
            </button>
          </b-row>

          <h5 class="fw-bold mt-2 pt-1 mb-0">
            Already have an account?
            <a class="link-danger"
              ><router-link to="/login" class="nav-link"
                >Login Here</router-link
              ></a
            >
          </h5>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterUser",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      invalidCredentials: false,
      errorText: "",
    };
  },
  methods: {
    async onSubmit() {
      let formData = {
        email: this.email,
        username: this.username,
        password: this.password,
      };

      await axios
        .post("http://localhost:5000/api/register", formData)
        .then((response) => {
          this.$router.push("/login");
          console.log(response.data);
        })
        .catch((error) => {
          this.invalidCredentials = true;
          this.errorText = error.response.data.message;
          console.log(error);
        });
    },
  },
  computed: {
    state_username() {
      return this.username.length >= 5;
    },
    invalidUsername() {
      if (this.username.length > 0) {
        return "Enter at least 5 characters.";
      }
      return "Please enter something.";
    },
    state_email() {
      // eslint-disable-next-line
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(this.email);
    },
    state_password() {
      // eslint-disable-next-line
      const pattern = /\d.*[A-Z]|[A-Z].*\d/;
      return pattern.test(this.password) && this.password.length > 8;
    },
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
