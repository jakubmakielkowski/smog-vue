<template>
  <div id="map-container" class="map-container"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import { getStations } from "@/services/api/stations.js";

const config = {
  coords: [53.136256, 23.156064],
  initialZoom: 11,
  minZoom: 8,
  maxZoom: 15
};

export default {
  name: "MapContainer",
  data() {
    return {
      map: null
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
