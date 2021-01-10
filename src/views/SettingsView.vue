<template>
  <div class="page">
    <header>
      <h1 class="h1">{{ $t("Settings") }}</h1>
      <p class="mb16">
        {{ $t("Adjust app for yourself.") }}
      </p>
    </header>
    <section>
      <h2 class="h2">{{ $t("Geolocation") }}</h2>
      <p>
        {{ $t("Click this button to navigate to your position on the map. Geolocation access is needed.") }}
      </p>
      <ButtonFull @submit="handleGeolocation">
        {{ $t("Locate me") }}
      </ButtonFull>
    </section>
    <section>
      <h2 class="h2">{{ $t("Language") }}</h2>
      <p>
        {{ $t("Choose language.") }}
      </p>
      <div>
        <ButtonRadio
          v-for="(lang, i) in langs"
          :id="`button-langauge-${lang.code}`"
          :key="`lang${i}`"
          :value="lang.code"
          name="language"
          :checked="root.language === lang.code"
          @submit="handleLanguageChange"
        >
          {{ lang.name }}
        </ButtonRadio>
      </div>
    </section>
    <section>
      <h2 class="h2">{{ $t("Source") }}</h2>
      <p>
        {{ $t("Choose data source.") }}
      </p>
      <div>
        <ButtonRadio
          v-for="(source, i) in sources"
          :id="`button-source-${source.name}`"
          :key="`source${i}`"
          :value="source.code"
          name="source"
          :checked="api.source === source.code"
          @submit="handleSourceChange"
        >
          {{ $t(source.name) }}
        </ButtonRadio>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ButtonFull from "@/components/ui/ButtonFull.vue";
import ButtonRadio from "@/components/ui/ButtonRadio.vue";
import { localize } from "@/services/geolocation/geolocation.js";

export default {
  name: "SettingsView",
  components: {
    ButtonFull,
    ButtonRadio
  },
  computed: {
    ...mapState({
      api: state => state.api,
      map: state => state.map,
      root: state => state.root
    })
  },
  data() {
    return {
      langs: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" }
      ],
      sources: [
        { code: "GIOS", name: "GIOS" },
        { code: "Airly", name: "Airly" },
        { code: "", name: "All" }
      ]
    };
  },
  methods: {
    handleGeolocation() {
      localize();
      this.$router.push("/");
    },
    handleLanguageChange(language) {
      this.$i18n.locale = language;
      this.$store.dispatch("root/setLanguage", language);
    },
    handleSourceChange(code) {
      this.$store.dispatch("api/setSource", code);
    }
  }
};
</script>

<style lang="scss"></style>
