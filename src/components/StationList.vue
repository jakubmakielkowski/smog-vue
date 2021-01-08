<template>
  <ul class="station-list mb48">
    <li v-for="(station, i) in stations" :key="i" tabindex="0" class="station-item">
      <StationItem
        :city="station.address.city"
        :street="station.address.street"
        @click.native="navigateToStation(station.stationId)"
      />
    </li>
  </ul>
</template>

<script>
import StationItem from "@/components/StationItem.vue";

export default {
  name: "StationList",
  components: {
    StationItem
  },
  props: {
    stations: {
      required: true,
      type: Array
    }
  },
  methods: {
    navigateToStation(stationId) {
      this.$router.push(`/station/${stationId}`);
    }
  }
};
</script>

<style lang="scss">
.station-list {
  border: 1px solid $color-secondary;
  border-radius: 8px;
  overflow: hidden;
}

.station-item {
  &:focus,
  &:hover {
    background-color: $background-input-active;
    box-shadow: $shadow-active;
  }
}
</style>
