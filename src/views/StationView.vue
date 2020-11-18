<template>
  <div class="page">
    <div v-if="apiResponseLoading" class="p32 search-info">{{ $t("Loading station data") }}...</div>
    <div v-else>
      <div v-if="stationData">
        <header>
          <h1 class="h1">{{ $t("Station") }} {{ stationData.address.city }}</h1>
          <h2 class="h2">{{ stationData.address.street }}</h2>
        </header>
        <ButtonFull class="w100 mb12" @submit="navigateToStation">
          {{ $t("Navigate to station") }}
        </ButtonFull>
        <section>
          <header>
            <h2 class="h2">{{ $t("Quality index") }}</h2>
            <p>{{ $t("Air quality:") }} {{ qualityIndexLevel }}</p>
            <QualityIndexIndicator :qualityindexlevel="qualityIndexLevel" />
          </header>
        </section>
        <ButtonFull class="w100" @submit="handleSaveStationButtonClick">
          {{ isStationSaved ? $t("Remove station from saved") : $t("Add station to saved") }}
        </ButtonFull>
      </div>
      <div v-else-if="apiResponseError" class="p32 search-info">
        {{ $t("Fetching station error") }}
      </div>
    </div>
  </div>
</template>

<script>
import ButtonFull from "@/components/ui/ButtonFull.vue";
import QualityIndexIndicator from "@/components/ui/QualityIndexIndicator.vue";
import mapStore from "@/store/map";
import ApiMixin from "@/mixins/api";

import { getStation, getStationMeasurement, getStationQualityIndex } from "@/services/smogApi/stations.js";
import { addSavedStation, removeSavedStation, isStationSaved } from "@/services/localStorage/savedStations";

export default {
  name: "StationView",
  components: {
    ButtonFull,
    QualityIndexIndicator
  },
  mixins: [ApiMixin],
  props: {
    stationId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      stationData: null,
      measurementData: null,
      qualityIndexData: null,
      isStationSaved: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (vm._props.stationId) {
        vm.apiRequestPerformed = true;

        try {
          const stationData = await getStation(vm._props.stationId);

          // TODO make API differ network error and no station
          if (stationData) {
            vm.stationData = stationData;
            vm.isStationSaved = isStationSaved(stationData);

            vm.apiResponseSuccess = true;
          } else {
            vm.apiResponseEmpty = true;
          }
        } catch (error) {
          this.apiResponseError = true;
        }

        vm.loading = false;
      }
    });
  },
  computed: {
    qualityIndexLevel() {
      return this.qualityIndexData && this.qualityIndexData.level;
    }
  },
  watch: {
    apiResponseEmpty() {
      // TODO create 404 page
      this.$router.push("/not-found");
    }
  },
  async mounted() {
    this.measurementData = await getStationMeasurement(this.$props.stationId);
    this.qualityIndexData = await getStationQualityIndex(this.$props.stationId);
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
