<template>
  <div class="page">
    <header>
      <h1 class="h1">{{ $t("Saved stations") }}</h1>
      <p class="mb16">
        {{ $t("Measuring points observed by you. Click the name to go to the station.") }}
      </p>
    </header>
    <div v-if="!loading">
      <StationList v-if="stations.length" :stations="stations" />
      <div v-else class="p32 saved-stations-info">{{ $t("No saved stations") }}</div>
    </div>
    <div v-else class="p32 saved-stations-info">{{ $t("Loading station data") }}...</div>
  </div>
</template>

<script>
import StationList from "@/components/StationList.vue";
import { getSavedStations } from "@/services/localStorage/savedStations";

export default {
  name: "SavedStationsView",
  components: {
    StationList
  },
  data() {
    return {
      stations: [],
      loading: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.loading = true;

      const stations = await getSavedStations();

      vm.stations = stations;

      vm.loading = false;
    });
  }
};
</script>

<style lang="scss">
.saved-stations-info {
  text-align: center;
}
</style>
