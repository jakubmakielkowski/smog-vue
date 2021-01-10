<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
    <LandingModal v-if="isModalVisible" />
    <Navigation v-else />
    <MapContainer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LandingModal from "@/components/LandingModal.vue";
import MapContainer from "@/components/map/MapContainer.vue";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    LandingModal,
    Navigation,
    MapContainer
  },
  computed: {
    ...mapState({
      root: state => state.root
    }),
    isModalVisible() {
      return !this.root.landingModal;
    }
  }
};
</script>
