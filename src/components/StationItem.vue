<template>
  <div class="station-item p16">
    <h3 class="station-item-name m0">{{ $t("Station") }} {{ [city, street] | stationName }}</h3>
  </div>
</template>

<script>
export default {
  name: "StationItem",
  filters: {
    stationName([city, street]) {
      let name = "";

      if (city) {
        name += city;
      }

      if (street) {
        // If city was added to name
        if (name) {
          name += ", ";
        }

        name += street;
      }

      return name;
    }
  },
  props: {
    city: {
      default: "",
      required: false,
      type: String
    },
    street: {
      default: "",
      required: false,
      type: String
    }
  }
};
</script>

<style lang="scss">
.station-item {
  border-bottom: 1px solid $color-secondary;

  &:last-child {
    border-bottom: none;
  }
}

.station-item-name {
  font-weight: 400;
  font-size: 14px;
}
</style>
