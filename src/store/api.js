import { sourceStorageName, getLocalStorageData, setLocalStorageData } from "@/services/localStorage/localStorage";

export default {
  namespaced: true,
  state: {
    bounds: null,
    search: "",
    source: getLocalStorageData(sourceStorageName) || ""
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
      setLocalStorageData(sourceStorageName, payload);
      state.source = getLocalStorageData(sourceStorageName);
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
