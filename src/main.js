import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";

import { languageStorageName, getLocalStorageData } from "./services/localStorage/localStorage";
import pl from "./i18n/pl.json";
import en from "./i18n/en.json";
Vue.config.productionTip = false;

Vue.use(VueI18n);

const messages = {
  en: en,
  pl: pl
};

const i18n = new VueI18n({
  locale: getLocalStorageData(languageStorageName) || "en",
  fallbackLocale: "en",
  messages
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import "./styles/index.scss";
import "./styles/layout.scss";
import "./styles/map.scss";
import "./styles/reset.scss";
import "./styles/transitions.scss";
import "./styles/variables.scss";
