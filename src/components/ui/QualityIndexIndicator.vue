<template>
  <div class="quality-index-indicator" :style="{ backgroundColor: color }"></div>
</template>

<script>
import { getColorByLevel } from "@/helpers/qualityIndex";

export default {
  name: "QualityIndexIndicator",
  props: {
    qualityindexlevel: {
      default: "",
      required: false,
      type: String
    }
  },
  data() {
    return {
      color: null
    };
  },
  computed: {
    qualityIndexColor() {
      return getColorByLevel(this.$props.qualityIndexLevel);
    }
  },
  watch: {
    qualityindexlevel(newValue) {
      this.color = getColorByLevel(newValue);
    }
  }
};
</script>

<style lang="scss">
.quality-index-indicator {
  border-radius: 100%;
  height: 40px;
  width: 40px;
}
</style>
