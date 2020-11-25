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
            <h2 class="h2 mb0">{{ $t("Air quality") }}</h2>
          </header>
          <div class="quality-index-container">
            <QualityIndexIndicator :qualityindexlevel="qualityIndexLevel" class="mr8" />
            <p>{{ $t("Air quality") }}: {{ qualityIndexLevel }}</p>
          </div>
        </section>
        <header>
          <h2 class="h2 mb8">{{ $t("Measurements") }}</h2>
        </header>
        <div class="parameters-container mb12">
          <ButtonRadio
            v-for="(param, i) in params"
            :id="`button-forecast-param-${param}`"
            :key="`param-${i}`"
            class="mr8"
            :value="param"
            :checked="param === currentParam"
            name="forecast-parameter"
            @submit="handleParamChange"
          >
            {{ param }}
          </ButtonRadio>
        </div>
        <section :if="historicMeasurements.length" class="mb16">
          <header>
            <h3 class="h3 mt4 mb8">{{ $t("Last day measurement") }}</h3>
          </header>
          <Chart :measurement-data="historicMeasurements" class="mb16" />
        </section>
        <section :if="forecastMeasurements.length" class="mb16">
          <header>
            <h3 class="h3 mt4 mb8">{{ $t("Next day measurement") }}</h3>
          </header>
          <Chart :measurement-data="forecastMeasurements" class="mb16" />
        </section>
        <ButtonFull class="w100 mb64" @submit="handleSaveStationButtonClick">
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
import ButtonRadio from "@/components/ui/ButtonRadio.vue";
import Chart from "@/components/Chart.vue";
import QualityIndexIndicator from "@/components/ui/QualityIndexIndicator.vue";
import mapStore from "@/store/map";
import ApiMixin from "@/mixins/api";

import { getStation, getStationMeasurement, getStationQualityIndex } from "@/services/smogApi/stations.js";
import { addSavedStation, removeSavedStation, isStationSaved } from "@/services/localStorage/savedStations";

export default {
  name: "StationView",
  components: {
    ButtonFull,
    ButtonRadio,
    Chart,
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
      currentParam: null,
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
      return this.qualityIndexData?.level;
    },
    measurements() {
      return this.measurementData?.measurements;
    },
    params() {
      return this.measurements?.map(measurement => measurement.param);
    },
    historicMeasurements() {
      return this.measurements?.find(measurement => measurement.param === this.currentParam)?.historicValues || [];
    },
    forecastMeasurements() {
      return this.measurements?.find(measurement => measurement.param === this.currentParam)?.forecastValues || [];
    }
  },
  watch: {
    apiResponseEmpty() {
      // TODO create 404 page
      this.$router.push("/not-found");
    }
  },
  async mounted() {
    try {
      this.measurementData = await getStationMeasurement(this.$props.stationId);
      this.qualityIndexData = await getStationQualityIndex(this.$props.stationId);
      this.currentParam = this.measurementData.measurements[0].param;
    } catch (error) {}
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
    },
    handleParamChange(value) {
      this.currentParam = value;
    }
  }
};
</script>

<style lang="scss">
.search-info {
  text-align: center;
}

.quality-index-container {
  align-items: center;
  display: flex;
}

.parameters-container {
  display: flex;
}
</style>
