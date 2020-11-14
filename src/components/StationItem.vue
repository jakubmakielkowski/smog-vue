<template>
  <div class="station-item p16">
    <h3 class="station-item-name m0">{{ city }} - {{ street }}</h3>
  </div>
</template>

<script>
export default {
  name: "StationItem",
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
}

.station-item-name {
  font-weight: 400;
  font-size: 14px;
}
</style>
