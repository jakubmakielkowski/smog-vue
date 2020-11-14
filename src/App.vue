<template>
  <div id="app">
    <Navigation />
    <MapContainer />
    <router-view />
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

<style lang="scss"></style>
