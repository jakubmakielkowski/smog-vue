import {
  languageStorageName,
  modalStorageName,
  getLocalStorageData,
  setLocalStorageData
} from "../services/localStorage/localStorage";

export default {
  namespaced: true,
  state: {
    language: getLocalStorageData(languageStorageName) || "en",
    landingModal: getLocalStorageData(modalStorageName)
  },
  mutations: {
    setLanguage(state, payload) {
      state.language = payload;
      setLocalStorageData(languageStorageName, payload);
    },
    setLandingModal(state, payload) {
      state.landingModal = payload;
      setLocalStorageData(modalStorageName, payload);
    }
  },
  actions: {
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    },
    setLandingModal(context, payload) {
      context.commit("setLandingModal", payload);
    }
  }
};
