import Leaflet from "leaflet";

import mapStore from "@/store/map";
import { getStations } from "@/services/smogApi/stations";
import { getColorByLevel } from "@/helpers/qualityIndex";

const mapConfig = {
  center: mapStore.state.position,
  zoom: 8,
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
  data() {
    return {
      map: null,
      pointsLayer: null
    };
  },
  mounted() {
    this.initialize();
    this.populate();
  },
  methods: {
    initialize() {
      this.map = Leaflet.map("map-container", mapConfig);
      Leaflet.tileLayer(process.env.VUE_APP_MAPBOX_STYLE_URL, tileLayerConfig).addTo(this.map);

      this.pointsLayer = Leaflet.featureGroup().addTo(this.map);
      this.pointsLayer.on("click", this.handleMarkerClick);
    },
    async populate() {
      try {
        this.apiRequestPerformed = true;

        // TODO: update api - no stations case
        const stationsResponse = await getStations();
        const stations = stationsResponse.data;

        stations.forEach(station => this.addPoint(station));
        this.apiResponseSuccess = true;
      } catch (error) {
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
    }
  }
};
