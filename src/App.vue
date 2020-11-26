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
import MapContainer from "@/components/map/MapContainer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    MapContainer
  }
};
</script>
