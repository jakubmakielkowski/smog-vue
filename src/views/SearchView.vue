<template>
  <div class="page">
    <header>
      <h1 class="h1">Search</h1>
      <p class="mb16">Type station address and select one to choose.</p>
    </header>
    <div>
      <TextInput
        v-model="searchInput"
        :autofocus="true"
        class="w100 mb12"
        placeholder="City or street name..."
        @submit="handleSearch"
      />
      <ButtonFull v-if="searchInput" class="w100" @submit="handleSearch">
        Submit
      </ButtonFull>
    </div>
  </div>
</template>

<script>
import ButtonFull from "@/components/ui/ButtonFull.vue";
import TextInput from "@/components/ui/TextInput.vue";

export default {
  name: "SearchView",
  components: {
    ButtonFull,
    TextInput
  },
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    handleSearch() {
      console.log(this.searchInput);
    }
  }
};
</script>

<style lang="scss"></style>
