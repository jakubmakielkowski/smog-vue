<template>
  <div class="page">
    <div v-if="!loading">
      <div v-if="city || street">
        <header>
          <h1 class="h1">{{ $t("Station") }} {{ city }}</h1>
          <h2 class="h2">{{ street }}</h2>
        </header>
      </div>
      <div v-else-if="error" class="p32 search-info">
        {{ $t("Fetching station error") }}
      </div>
    </div>
    <div v-else class="p32 search-info">{{ $t("Loading station data") }}...</div>
  </div>
</template>

<script>
import { getStation } from "@/services/smogApi/stations.js";

export default {
  name: "StationView",
  props: {
    stationId: {
      required: true,
      type: String
    }
  },
  data() {
    return { city: null, street: null, loading: false, error: false };
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (vm._props.stationId) {
        vm.loading = true;

        const stationData = await getStation(vm._props.stationId);

        if (stationData) {
          vm.city = stationData.address.city;
          vm.street = stationData.address.street;
        } else {
          vm.error = true;
        }

        vm.loading = false;
      }
    });
  }
};
</script>

<style lang="scss">
.search-info {
  text-align: center;
}
</style>
