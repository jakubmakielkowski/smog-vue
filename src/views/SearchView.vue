<template>
  <div class="page">
    <header>
      <h1 class="h1">{{ $t("Search") }}</h1>
      <p class="mb16">{{ $t("Type station address and select one to choose.") }}</p>
    </header>
    <div>
      <TextInput
        v-model="searchInput"
        :autofocus="true"
        class="w100 mb12"
        placeholder="City or street name"
        @submit="handleSearch"
      />
      <ButtonFull v-if="searchInput" class="w100" @submit="handleSearch">
        {{ $t("Submit") }}
      </ButtonFull>
    </div>

    <div v-if="apiResponseLoading" class="p32 search-info">
      {{ $t("Searching stations") }}
    </div>
    <div v-else>
      <div v-if="apiResponseSuccess">
        <h2 class="h2">{{ $t("Results") }}</h2>
        <StationList :stations="stations" />
      </div>
      <div v-else-if="apiResponseError" class="p32 search-info">
        {{ $t("Fetching stations error") }}
      </div>
      <div v-else-if="apiResponseEmpty" class="p32 search-info">
        {{ $t("No results") }}
      </div>
    </div>
  </div>
</template>

<script>
import StationList from "@/components/StationList.vue";
import ButtonFull from "@/components/ui/ButtonFull.vue";
import TextInput from "@/components/ui/TextInput.vue";
import ApiMixin from "@/mixins/api";

import { searchStations } from "@/services/smogApi/stations.js";

export default {
  name: "SearchView",
  components: {
    ButtonFull,
    StationList,
    TextInput
  },
  mixins: [ApiMixin],
  data() {
    return {
      searchInput: "",
      stations: []
    };
  },
  methods: {
    async handleSearch() {
      this.clearApiResonse();
      this.apiRequestPerformed = true;

      try {
        this.stations = await searchStations(this.searchInput);

        if (this.stations.length) {
          this.apiResponseSuccess = true;
        } else {
          this.apiResponseEmpty = true;
        }
      } catch (error) {
        this.apiResponseError = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-info {
  text-align: center;
}
</style>
