<template>
  <button
    type="button"
    class="button"
    @click="$emit('submit', $event.target.value)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "ButtonFull"
};
</script>

<style lang="scss">
.button {
  background-color: $background-button;
  border: 2px solid $background-button;
  border-radius: 8px;
  color: $color-primary;
  padding: 8px;

  &:focus {
    background-color: $background-button-active;
    border-color: $background-button-active;
    box-shadow: $shadow-active;
  }
}
</style>
