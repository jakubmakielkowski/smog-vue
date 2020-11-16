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
import mapStore from "@/store/map";
import { getStations } from "@/services/smogApi/stations.js";
import { getColorByLevel } from "@/components/map/helpers.js";

const config = {
  coords: mapStore.state.position,
  initialZoom: 8,
  minZoom: 7,
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
      markersLayer: null,
      mapLoadingStatus: "Loading map"
    };
  },
  computed: {
    position() {
      return mapStore.state.position;
    }
  },
  watch: {
    position: {
      deep: true,
      handler(newPosition) {
        this.map.flyTo(newPosition, 11);
      }
    }
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

      this.markersLayer = Leaflet.featureGroup().addTo(this.map);

      stations.forEach(station => {
        const { stationId, level } = station;
        const { latitude, longitude } = station.location;

        const marker = Leaflet.circleMarker([latitude, longitude], {
          fillColor: getColorByLevel(level),
          fillOpacity: 0.5,
          radius: 16,
          stroke: false,
          stationId: stationId
        });

        marker.addTo(this.markersLayer);
        marker.addTo(this.map);
      });

      this.markersLayer.on("click", this.handleMarkerClick);
      this.mapLoadingStatus = false;
    },
    handleMarkerClick(event) {
      const { stationId } = event.layer.options;
      this.$router.push(`/station/${stationId}`);
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
