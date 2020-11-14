<template>
  <div>
    <transition name="fade">
      <Modal v-if="mapLoadingStatus"> {{ mapLoadingStatus }}... </Modal>
    </transition>
    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import Modal from "@/components/ui/Modal.vue";

import { getStations } from "@/services/smogApi/stations.js";

const config = {
  coords: [53.136256, 23.156064],
  initialZoom: 11,
  minZoom: 8,
  maxZoom: 15
};

export default {
  name: "MapContainer",
  components: {
    Modal
  },
  data() {
    return {
      map: null,
      mapLoadingStatus: "Loading map"
    };
  },
  mounted() {
    this.initializeMap();
    this.populateMap();
  },
  methods: {
    initializeMap() {
      const { coords, initialZoom, minZoom, maxZoom } = config;

      this.map = Leaflet.map("map-container", {
        center: coords,
        maxZoom: maxZoom,
        minZoom: minZoom,
        zoom: initialZoom,
        zoomControl: false
      });

      Leaflet.tileLayer(process.env.VUE_APP_MAPBOX_STYLE_URL, {
        accessToken: process.env.VUE_APP_MAPBOX_API_KEY,
        id: "mapbox/smog-map",
        maxZoom: maxZoom
      }).addTo(this.map);

      this.mapLoadingStatus = "Fetching smog data";
    },
    async populateMap() {
      const stationsResponse = await getStations();
      const stations = stationsResponse.data;

      stations.forEach(station => {
        const { latitude, longitude } = station.location;

        Leaflet.circleMarker([latitude, longitude], {
          fillColor: "#666",
          fillOpacity: 0.5,
          radius: 16,
          stroke: false
        }).addTo(this.map);
      });

      this.mapLoadingStatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  height: 100vh;
  width: 100vw;
}
</style>
