import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../store/modules/index";
import TrendChart from "vue-trend-chart";
import BootstrapVue3 from "bootstrap-vue-3";
import "animate.css";
import "hamburgers/dist/hamburgers.min.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "aframe";

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.use(TrendChart);
app.mount("#app");
