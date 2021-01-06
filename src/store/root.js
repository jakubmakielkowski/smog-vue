import { getLanguage, setLanguage } from "../services/localStorage/language";

export default {
  namespaced: true,
  state: {
    language: getLanguage() || "en"
  },
  mutations: {
    setLanguage(state, payload) {
      state.language = payload;
      setLanguage(payload);
    }
  },
  actions: {
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    }
  }
};
