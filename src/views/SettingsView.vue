<template>
  <div class="page">
    <header>
      <h1 class="h1">Settings</h1>
      <p class="mb16">
        Adjust app for yourself.
      </p>
    </header>
    <section>
      <h2 class="h2">Geolocation</h2>
      <p>
        Click this button to navigate to your position on the map. Geolocation
        access is needed
      </p>
      <ButtonFull @submit="handleGeolocation">
        Locate me
      </ButtonFull>
    </section>
  </div>
</template>

<script>
import ButtonFull from "@/components/ui/ButtonFull.vue";
import { localize } from "@/services/geolocation/geolocation.js";

export default {
  name: "SettingsView",
  components: {
    ButtonFull
  },
  methods: {
    handleGeolocation() {
      localize();
    }
  }
};
</script>

<style lang="scss"></style>
