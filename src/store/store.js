import Vue from "vue";
import Vuex from "vuex";

import map from "./map";
import api from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    map
  }
});
