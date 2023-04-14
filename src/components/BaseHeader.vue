<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark">
      <button
        class="hamburger hamburger--slider"
        :class="{ 'is-active': menuOpen }"
        type="button"
        @click.prevent="toggleMenu(!menuOpen)"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <b-navbar-brand>Wellbeing Diss</b-navbar-brand>
    </b-navbar>
    <transition name="menu">
      <div
        class="menu-overlay"
        v-if="menuOpen"
        :style="{
          '--circle-size': circleSize + 'px',
          '--circle-top': circleTop + 'px',
          '--circle-left': circleLeft + 'px',
        }"
      >
        <div class="menu-items">
          <router-link
            to="/"
            class="nav-link"
            @click.prevent="toggleMenu(false)"
            >Home</router-link
          >
          <router-link
            v-if="!isAuth"
            to="/login"
            class="nav-link"
            @click.prevent="toggleMenu(false)"
            >Login</router-link
          >
          <router-link
            v-if="isAuth"
            to="/dashboard"
            class="nav-link"
            @click.prevent="toggleMenu(false)"
            >Dashboard</router-link
          >
          <router-link
            v-if="isAuth"
            to="/manageTracker"
            class="nav-link"
            @click.prevent="toggleMenu(false)"
            >Manage Your Trackers</router-link
          >
          <a v-if="isAuth" class="nav-link" @click.prevent="onLogout">Logout</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "BaseHeader",
  data() {
    return {
      menuOpen: false,
      circleSize: 0,
      circleTop: 0,
      circleLeft: 0,
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAuth: "isAuthenticated",
    }),
  },
  methods: {
    toggleMenu(shouldOpen) {
      if (shouldOpen) {
        // Calculate the circle size and position
        const navbarToggle = this.$el.querySelector(".hamburger");
        const { top, left } = navbarToggle.getBoundingClientRect();
        const maxDimension = Math.max(window.innerWidth, window.innerHeight);
        this.circleSize = maxDimension * 2;
        this.circleTop = top - this.circleSize / 2;
        this.circleLeft = left - this.circleSize / 2;
      }
      setTimeout(
        () => {
          this.$el
            .querySelector(".menu-overlay")
            .classList.toggle("menu-open", shouldOpen);
        },
        shouldOpen ? 600 : 0
      );
      this.menuOpen = shouldOpen;
    },
    onLogout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
<style scoped>
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  pointer-events: none;
}

.menu-overlay::before {
  content: "";
  position: absolute;
  top: var(--circle-top);
  left: var(--circle-left);
  width: var(--circle-size);
  height: var(--circle-size);
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 50%;
  transform-origin: top left;
  animation: reveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  pointer-events: none;
}

@keyframes reveal {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.close-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  pointer-events: all;
  z-index: 1001;
}

.navbar {
  color: #fff;
  border-bottom: 1px solid #fff;
  padding-bottom: 0px;
  height: 10vh;
}

.navbar-brand {
  color: #fff;
}
.nav-link {
  font-size: 1.5rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  background-color: transparent;
  padding: 10px 20px;
  opacity: 0;
  transition: opacity 0.5s ease, font-style 0.3s ease;
}

.nav-link:hover {
  font-style: italic;
}

.menu-overlay.menu-open .nav-link {
  opacity: 1;
}

.nav-link:hover {
  color: #42b983;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.5s ease;
}

.menu-enter,
.menu-leave-to {
  opacity: 0;
}

.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: #ffffff;
  z-index: 1001;
}

.hamburger.is-active:hover .hamburger-inner,
.hamburger.is-active:hover .hamburger-inner::before,
.hamburger.is-active:hover .hamburger-inner::after {
  background-color: #ffffff;
}

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

/* Login Page styles */
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d1117;
}

.login-container {
  max-width: 400px;
  padding: 20px;
  border-radius: 5px;
  background-color: #0d1117;
  border: 1px solid #30363d;
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
  color: #c9d1d9;
}

.form-control {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #30363d;
  border-radius: 5px;
  background-color: #0d1117;
  color: #c9d1d9;
}

.form-control::placeholder {
  color: #c9d1d9;
}

.btn-primary {
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #34d399;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
}

.btn-link:hover {
  color: #34d399;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-text {
  font-size: 16px;
  font-weight: 500;
  color: #c9d1d9;
  margin-right: 10px;
}

.text-danger {
  color: #f85149;
}

.animate__animated {
  animation-duration: 1s;
}

.animate__pulse {
  animation-name: pulse;
}
.hamburger-box .hamburger-inner,
.hamburger-box .hamburger-inner::before,
.hamburger-box .hamburger-inner::after {
  background-color: #ffffff;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
