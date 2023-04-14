<template>
  <div class="app-container">
    <div class="login-container">
      <h1 class="login-header">Welcome to Wellbeing App</h1>
      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div v-if="invalidCredentials" class="form-group">
          <small class="text-danger">Invalid credentials</small>
        </div>
        <button
          type="submit"
          @click.prevent="onSubmit"
          @click="animateButton"
          class="btn btn-primary btn-block"
        >
          Login
        </button>
      </form>
      <div class="signup-link">
        <span class="signup-text">Don't have an account?</span>
        <router-link to="/register" class="btn btn-link"
          >Register Here</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginUser",
  data() {
    return {
      email: "",
      password: "",
      invalidCredentials: false,
    };
  },
  methods: {
    onSubmit() {
      let formData = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("auth/login", formData)
        .then(() => {
          console.log("pushing");
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          this.invalidCredentials = !error.success;
        });
    },
    animateButton(event) {
      event.target.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        event.target.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    },
  },
};
</script>
<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #23272a;
}

.login-container {
  max-width: 400px;
  padding: 20px;
  border-radius: 5px;
  background-color: #23272a;
}

.login-header {
  margin-top: 0;
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
}

.form-control {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  background-color: #343a40;
  color: #ffffff;
}

.form-control::placeholder {
  color: #adb5bd;
}

.btn-primary {
  background-color: #17a2b8;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0d8dba;
}

.btn-link {
  color: #17a2b8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
}

.btn-link:hover {
  color: #0d8dba;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-text {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin-right: 10px;
}
</style>
