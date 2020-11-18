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
import Modal from "@/components/ui/Modal.vue";
import mapStore from "@/store/map";
import MapContainerMixin from "./MapContainerMixin";
import ApiMixin from "@/mixins/api";

export default {
  name: "MapContainer",
  components: {
    Modal
  },
  mixins: [ApiMixin, MapContainerMixin],
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
