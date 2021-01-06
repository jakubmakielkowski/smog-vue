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

import { mapState } from "vuex";
import { getStations } from "@/services/smogApi/stations";
import { getColorByLevel } from "@/helpers/qualityIndex";

const mapConfig = {
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
      mapContainer: null,
      pointsLayer: null
    };
  },
  computed: {
    ...mapState({
      api: state => state.api,
      map: state => state.map
    }),
    modalText() {
      return this;
    },
    position() {
      return this.map.position;
    }
  },
  watch: {
    position: {
      deep: true,
      handler(newPosition) {
        this.mapContainer.flyTo(newPosition, 11);
      }
    }
  },
  mounted() {
    this.initializeMap();
    this.setBounds();
  },
  methods: {
    initializeMap() {
      this.mapContainer = Leaflet.map("map-container", {
        ...mapConfig,
        center: this.map.position
      });
      Leaflet.tileLayer(process.env.VUE_APP_MAPBOX_STYLE_URL, tileLayerConfig).addTo(this.mapContainer);

      this.pointsLayer = Leaflet.featureGroup().addTo(this.mapContainer);
      this.pointsLayer.on("click", this.handleMarkerClick);

      this.mapContainer.on("moveend", this.setBounds);
    },
    setBounds() {
      const bounds = this.mapContainer.getBounds();
      const { _southWest, _northEast } = bounds;
      const parsedBounds = [_southWest.lat, _northEast.lat, _southWest.lng, _northEast.lng].map(bound =>
        bound.toFixed(4)
      );

      this.$store.dispatch("api/setBounds", parsedBounds);

      this.populate();
    },
    async populate() {
      try {
        this.apiRequestPerformed = true;

        const stationsResponse = await getStations();
        const stations = stationsResponse.data;

        if (this.map.stations) {
          this.$store.dispatch("map/appendStations", stations);
        } else {
          this.$store.dispatch("map/setStations", stations);
        }

        this.pointsLayer.clearLayers();

        if (this.map.stations) {
          Array.from(this.map.stations).forEach(station => this.addPoint(station));
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
      marker.addTo(this.mapContainer);
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
