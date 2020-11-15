import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import mapStore from "./store/map";

Vue.config.productionTip = false;

new Vue({
  router,
  mapStore,
  render: h => h(App)
}).$mount("#app");

import "./styles/index.scss";
import "./styles/layout.scss";
import "./styles/map.scss";
import "./styles/reset.scss";
import "./styles/transitions.scss";
import "./styles/variables.scss";
