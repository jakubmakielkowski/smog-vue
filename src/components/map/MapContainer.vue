<template>
  <div>
    <transition name="fade">
      <Modal v-if="apiResponseLoading || apiResponseError">
        {{ apiResponseLoading ? $t("Loading map") : $t("An error occured while fetching map. Try again later.") }}...
      </Modal>
    </transition>
    <div id="map-container" class="map-container" />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import Modal from "@/components/ui/Modal.vue";
import ApiMixin from "@/mixins/api";

import apiStore from "@/store/api";
import mapStore from "@/store/map";
import { getStations } from "@/services/smogApi/stations";
import { getColorByLevel } from "@/helpers/qualityIndex";

const mapConfig = {
  center: mapStore.state.position,
  zoom: 10,
  minZoom: 7,
  maxZoom: 15,
  zoomControl: false,
  renderer: Leaflet.canvas()
};

const tileLayerConfig = {
  accessToken: process.env.VUE_APP_MAPBOX_API_KEY,
  id: "mapbox/smog-map",
  maxZoom: mapConfig.maxZoom
};

const pointsLayerConfig = {
  fillOpacity: 0.5,
  radius: 16,
  stroke: false
};

export default {
  name: "MapContainer",
  components: {
    Modal
  },
  mixins: [ApiMixin],
  data() {
    return {
      map: null,
      pointsLayer: null
    };
  },
  computed: {
    modalText() {
      return this;
    },
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
    this.setBounds();
  },
  methods: {
    initializeMap() {
      this.map = Leaflet.map("map-container", mapConfig);
      Leaflet.tileLayer(process.env.VUE_APP_MAPBOX_STYLE_URL, tileLayerConfig).addTo(this.map);

      this.pointsLayer = Leaflet.featureGroup().addTo(this.map);
      this.pointsLayer.on("click", this.handleMarkerClick);

      this.map.on("moveend", this.setBounds);
    },
    setBounds() {
      const bounds = this.map.getBounds();
      const { _southWest, _northEast } = bounds;
      const parsedBounds = [_southWest.lat, _northEast.lat, _southWest.lng, _northEast.lng].map(bound =>
        bound.toFixed(4)
      );

      apiStore.dispatch("setBounds", parsedBounds);

      this.populate();
    },
    async populate() {
      try {
        this.apiRequestPerformed = true;

        const stationsResponse = await getStations();
        const stations = stationsResponse.data;

        if (mapStore.state.stations) {
          mapStore.dispatch("appendStations", stations);
        } else {
          mapStore.dispatch("setStations", stations);
        }

        this.pointsLayer.clearLayers();

        if (mapStore.state.stations) {
          Array.from(mapStore.state.stations).forEach(station => this.addPoint(station));
        }

        this.apiResponseSuccess = true;
      } catch (error) {
        console.error(error);
        this.apiResponseError = true;
      }
    },
    addPoint(station) {
      const { stationId, level } = station;
      const { latitude, longitude } = station.location;

      const marker = Leaflet.circleMarker([latitude, longitude], {
        fillColor: getColorByLevel(level),
        stationId: stationId,
        ...pointsLayerConfig
      });

      marker.addTo(this.pointsLayer);
      marker.addTo(this.map);
    },
    handleMarkerClick(event) {
      const { stationId } = event.layer.options;
      this.$router.push(`/station/${stationId}`);
    },
    redirectToStation(stationId) {
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
