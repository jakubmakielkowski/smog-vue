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
import Navigation from "@/components/Navigation.vue";
import MapContainer from "@/components/MapContainer.vue";

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
