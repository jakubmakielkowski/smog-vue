export default {
  namespaced: true,
  state: {
    position: {
      lat: 52.35,
      lon: 19.43
    },
    stations: null
  },
  mutations: {
    setPosition(state, payload) {
      const { lat, lon } = payload;
      state.position.lat = lat;
      state.position.lon = lon;
    },
    setStations(state, payload) {
      state.stations = payload;
    },
    removeStations(state) {
      state.stations = null;
    }
  },
  actions: {
    setPosition(context, payload) {
      context.commit("setPosition", payload);
    },
    setStations(context, payload) {
      context.commit("setStations", payload);
    },
    appendStations(context, payload) {
      const allStations = context.state.stations.concat(payload);

      const uniqueIds = new Set();

      const filteredStations = allStations.filter(el => {
        const duplicate = uniqueIds.has(el.stationId);
        uniqueIds.add(el.stationId);
        return !duplicate;
      });

      context.commit("setStations", filteredStations);
    },
    removeStations(context) {
      context.commit("removeStations");
    }
  }
};
