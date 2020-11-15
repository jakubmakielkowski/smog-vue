import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    position: {
      lat: 52.0691,
      lon: 19.4805
    }
  },
  mutations: {
    setPosition(state, payload) {
      const { lat, lon } = payload;
      state.position.lat = lat;
      state.position.lon = lon;
    }
  },
  actions: {
    setPosition(context, payload) {
      context.commit("setPosition", payload);
    }
  }
});
