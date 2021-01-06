import { getSource, setSource } from "@/services/localStorage/source";

export default {
  namespaced: true,
  state: {
    bounds: null,
    search: "",
    source: getSource() || null
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
      setSource(payload);
      state.source = getSource();
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
};
