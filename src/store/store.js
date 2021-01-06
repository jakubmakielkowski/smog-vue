import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import map from "./map";
import api from "./api";
import root from "./root";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    api,
    map,
    root
  },
  plugins: [createPersistedState()]
});
