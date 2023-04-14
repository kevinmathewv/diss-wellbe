<template>
  <div id="app">
    <BaseHeader />
    <router-view />
    <BottomNavigation />
  </div>
</template>

<script>
import BaseHeader from "./components/BaseHeader.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
export default {
  name: "App",
  created() {
    this.$store.dispatch("auth/autoLogin");
  },
  components: {
    BaseHeader,
    BottomNavigation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
