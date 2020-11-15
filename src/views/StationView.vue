<template>
  <div class="page">
    <div v-if="!loading">
      <div v-if="stationData">
        <header>
          <h1 class="h1">{{ $t("Station") }} {{ stationData.address.city }}</h1>
          <h2 class="h2">{{ stationData.address.street }}</h2>
        </header>
        <ButtonFull class="w100 mb12" @submit="navigateToStation">
          {{ $t("Navigate to station") }}
        </ButtonFull>
        <ButtonFull class="w100" @submit="handleSaveStationButtonClick">
          {{ isStationSaved ? $t("Remove station from saved") : $t("Add station to saved") }}
        </ButtonFull>
      </div>
      <div v-else-if="error" class="p32 search-info">
        {{ $t("Fetching station error") }}
      </div>
    </div>
    <div v-else class="p32 search-info">{{ $t("Loading station data") }}...</div>
  </div>
</template>

<script>
import ButtonFull from "@/components/ui/ButtonFull.vue";
import mapStore from "@/store/map";

import { getStation } from "@/services/smogApi/stations.js";
import { addSavedStation, removeSavedStation, isStationSaved } from "@/services/localStorage/savedStations";

export default {
  name: "StationView",
  components: {
    ButtonFull
  },
  props: {
    stationId: {
      required: true,
      type: String
    }
  },
  data() {
    return { stationData: null, isStationSaved: null, loading: false, error: false };
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (vm._props.stationId) {
        vm.loading = true;

        const stationData = await getStation(vm._props.stationId);

        if (stationData) {
          vm.stationData = stationData;
          vm.isStationSaved = isStationSaved(stationData);
        } else {
          vm.error = true;
        }

        vm.loading = false;
      }
    });
  },
  methods: {
    navigateToStation() {
      const { latitude, longitude } = this.stationData.location;
      mapStore.dispatch("setPosition", { lat: latitude, lon: longitude });
      this.$router.push(`/`);
    },
    handleSaveStationButtonClick() {
      if (this.isStationSaved) {
        removeSavedStation(this.stationData);
      } else {
        addSavedStation(this.stationData);
      }

      this.isStationSaved = isStationSaved(this.stationData);
    }
  }
};
</script>

<style lang="scss">
.search-info {
  text-align: center;
}
</style>
