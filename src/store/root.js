import { languageStorageName, getLocalStorageData, setLocalStorageData } from "../services/localStorage/localStorage";

export default {
  namespaced: true,
  state: {
    language: getLocalStorageData(languageStorageName) || "en"
  },
  mutations: {
    setLanguage(state, payload) {
      state.language = payload;
      setLocalStorageData(languageStorageName, payload);
    }
  },
  actions: {
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    }
  }
};
