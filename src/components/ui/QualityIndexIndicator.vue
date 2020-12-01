<template>
  <div class="quality-index-indicator" :style="{ backgroundColor: color }"></div>
</template>

<script>
import { getColorByLevel } from "@/helpers/qualityIndex";

export default {
  name: "QualityIndexIndicator",
  props: {
    qualityIndexLevel: {
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
  mounted() {
    this.color = getColorByLevel(this.$props.qualityIndexLevel);
  }
};
</script>

<style lang="scss">
.quality-index-indicator {
  border-radius: 100%;
  height: 20px;
  width: 20px;
}
</style>
