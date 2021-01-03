<template>
  <div v-if="alive" class="modal">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    data: {
      default: null,
      required: false,
      type: String
    },
    disappearAfter: {
      default: 0,
      requred: false,
      type: Number
    }
  },
  data() {
    return {
      alive: true
    };
  },
  watch: {
    data() {
      this.alive = true;
      this.show();
    }
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      if (this.$props.disappearAfter && this.alive) {
        setTimeout(() => {
          this.alive = false;
        }, this.$props.disappearAfter);
      }
    }
  }
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
