<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
    <Navigation />
    <MapContainer />
  </div>
</template>

<script>
import MapContainer from "@/components/MapContainer.vue";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
    MapContainer
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
