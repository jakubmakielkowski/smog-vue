<template>
  <input
    type="text"
    class="text-input"
    :placeholder="$t(placeholder)"
    :autofocus="autofocus"
    @input="$emit('input', $event.target.value)"
    @keyup.enter="$emit('submit', $event.target.value)"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    autofocus: {
      default: false,
      required: false,
      type: Boolean
    },
    placeholder: {
      default: "",
      required: false,
      type: String
    }
  }
};
</script>

<style lang="scss">
.text-input {
  border-radius: 8px;
  border: none;
  background-color: $background-input;
  color: $color-primary;
  font-family: $font-base;
  padding: 8px 12px;

  &:focus {
    background-color: $background-input-active;
    box-shadow: $shadow-active;
  }

  &::placeholder {
    font-size: 12px;
    color: #aaa;
  }
}
</style>
