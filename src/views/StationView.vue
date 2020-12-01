<template>
  <div class="page">
    <div v-if="apiResponseLoading" class="p32 search-info">{{ $t("Loading station data") }}...</div>
    <div v-else-if="stationData">
      <section>
        <header>
          <h1 class="h1">{{ $t("Station") }} {{ stationData.address.city }}</h1>
          <h2 class="h2">{{ stationData.address.street }}</h2>
        </header>
        <ButtonFull class="w100 mb12" @submit="navigateToStation">
          {{ $t("Navigate to station") }}
        </ButtonFull>
      </section>

      <section v-if="qualityIndexLevel">
        <header>
          <h2 class="h2 mb0">{{ $t("Air quality") }}</h2>
        </header>
        <div class="quality-index-container">
          <QualityIndexIndicator :quality-index-level="qualityIndexLevel" class="mr8" />
          <p>{{ $t("Air quality") }}: {{ qualityIndexLevel }}</p>
        </div>
      </section>

      <section v-if="historicMeasurements.length || forecastMeasurements.length" class="mb16">
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
        <div v-if="historicMeasurements.length">
          <h3 class="h3 mt4 mb8">{{ $t("Last day measurement") }} - {{ currentParam }}</h3>
          <Chart :measurement-data="historicMeasurements" type="historic" class="mb16" />
        </div>
        <div v-if="forecastMeasurements.length">
          <h3 class="h3 mt4 mb8">{{ $t("Next day measurement") }}</h3>
          <Chart :measurement-data="forecastMeasurements" type="forecast" class="mb16" />
        </div>
        <ButtonFull class="w100 mb64" @submit="handleSaveStationButtonClick">
          {{ isStationSaved ? $t("Remove station from saved") : $t("Add station to saved") }}
        </ButtonFull>
      </section>
    </div>
    <div v-else-if="apiResponseError" class="p32 search-info">
      {{ $t("Fetching station error") }}
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
      qualityIndexLevel: null,
      currentParam: null,
      isStationSaved: null
    };
  },
  computed: {
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
    stationId() {
      this.clearStationData();
      this.loadStationData();
      this.loadStationMeasurements();
      this.loadStationQualityIndex();
    }
  },
  created() {
    this.loadStationData();
    this.loadStationMeasurements();
    this.loadStationQualityIndex();
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
    },
    async loadStationData() {
      try {
        this.apiRequestPerformed = true;
        const stationData = await getStation(this.$props.stationId);

        // TODO make API differ network error and no station
        if (stationData) {
          this.stationData = stationData;
          this.isStationSaved = isStationSaved(stationData);

          const { level } = stationData;

          if (level) {
            this.qualityIndexLevel = level;
          }

          this.apiResponseSuccess = true;
        } else {
          this.apiResponseEmpty = true;
        }
      } catch (error) {
        this.apiResponseError = true;
      }
    },
    async loadStationMeasurements() {
      try {
        this.measurementData = await getStationMeasurement(this.$props.stationId);
        this.currentParam = this.measurementData.measurements[0]?.param;
      } catch (error) {
        console.log(error);
      }
    },
    async loadStationQualityIndex() {
      try {
        if (!this.qualityIndexLevel) {
          const qualityIndexData = await getStationQualityIndex(this.$props.stationId);
          this.qualityIndexLevel = qualityIndexData.level;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearStationData() {
      this.stationData = null;
      this.measurementData = null;
      this.qualityIndexLevel = null;
      this.currentParam = null;
      this.isStationSaved = null;
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
