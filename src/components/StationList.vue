<template>
  <ul class="station-list mb48">
    <li v-for="(station, i) in stations" :key="i" tabindex="0" class="station-item">
      <StationItem :city="station.address.city" :street="station.address.street" />
    </li>
  </ul>
</template>

<script>
import StationItem from "@/components/StationItem.vue";

export default {
  name: "SearchView",
  components: {
    StationItem
  },
  props: {
    stations: {
      required: true,
      type: Array
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
  &:focus {
    background-color: $background-input-active;
    box-shadow: $shadow-active;
  }
}
</style>
