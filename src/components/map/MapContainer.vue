<template>
  <div>
    <transition name="fade">
      <Modal v-if="!isMapLoaded"> {{ $t("Loading map") }}... </Modal>
    </transition>
    <div id="map-container" class="map-container" />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Modal from "@/components/ui/Modal.vue";
import mapStore from "@/store/map";
import MapContainerMixin from "./MapContainerMixin";

export default {
  name: "MapContainer",
  components: {
    Modal
  },
  mixins: [MapContainerMixin],
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
  methods: {
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
