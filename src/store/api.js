import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bounds: null,
    search: "",
    source: null
  },
  mutations: {
    setBounds(state, payload) {
      if (Array.isArray(payload) && payload.length === 4) {
        state.bounds = payload;
      }
    },
    setSearch(state, payload) {
      state.search = payload;
    },
    setSource(state, payload) {
      state.source = payload;
    }
  },
  actions: {
    setBounds(context, payload) {
      context.commit("setBounds", payload);
    },
    setSearch(context, payload) {
      context.commit("setSearch", payload);
    },
    setSource(context, payload) {
      context.commit("setSource", payload);
    }
  }
});
