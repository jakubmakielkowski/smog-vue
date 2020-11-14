<template>
  <div class="modal">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal"
};
</script>

<style lang="scss">
.modal {
  background: $background-primary;
  border-radius: 6px;
  box-shadow: $shadow-primary;
  color: $color-primary;
  margin-left: 50vw;
  margin-top: 50vh;
  padding: 16px;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 1003;
}
</style>
