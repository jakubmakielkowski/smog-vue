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
        Submit
      </ButtonFull>
    </div>
    <div v-if="!loading">
      <div v-if="stations.length">
        <h2 class="h2">{{ $t("Results") }}</h2>
        <StationList :stations="stations" />
      </div>
      <div v-else-if="error" class="p32 search-info">
        {{ $t("Fetching stations error") }}
      </div>
      <div v-else-if="searchPerformed" class="p32 search-info">
        {{ $t("No results") }}
      </div>
    </div>
    <div v-else class="p32 search-info">
      {{ $t("Searching stations") }}
    </div>
  </div>
</template>

<script>
import StationList from "@/components/StationList.vue";
import ButtonFull from "@/components/ui/ButtonFull.vue";
import TextInput from "@/components/ui/TextInput.vue";

import { searchStations } from "@/services/smogApi/stations.js";

export default {
  name: "SearchView",
  components: {
    ButtonFull,
    StationList,
    TextInput
  },
  data() {
    return {
      error: false,
      loading: false,
      searchPerformed: false,
      searchInput: "",
      stations: []
    };
  },
  methods: {
    async handleSearch() {
      this.loading = true;

      const name = this.searchInput;
      this.stations = await searchStations(name);

      this.error = Boolean(this.stations);
      this.loading = false;
      this.searchPerformed = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-info {
  text-align: center;
}
</style>
