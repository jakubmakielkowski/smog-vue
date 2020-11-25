<template>
  <div class="radio-container mb4">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      class="radio"
      :checked="checked"
      @click="$emit('submit', $event.target.value)"
    />
    <label :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "ButtonRadio",
  props: {
    checked: {
      default: false,
      required: false,
      type: Boolean
    },
    id: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: String
    }
  }
};
</script>

<style lang="scss">
.radio-container {
  display: flex;
  align-items: center;
}

.radio {
  margin: 0 8px 0 0;
  border-radius: 100px;
}
</style>
