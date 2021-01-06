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
          :id="`button-source-${source}`"
          :key="`source${i}`"
          :value="source"
          name="source"
          @submit="handleSourceChange"
        >
          {{ source }}
        </ButtonRadio>
      </div>
    </section>
  </div>
</template>

<script>
import ButtonFull from "@/components/ui/ButtonFull.vue";
import ButtonRadio from "@/components/ui/ButtonRadio.vue";
import { localize } from "@/services/geolocation/geolocation.js";
import { setLanguage } from "@/services/localStorage/language";
import { setSource } from "@/services/localStorage/source";

export default {
  name: "SettingsView",
  components: {
    ButtonFull,
    ButtonRadio
  },
  data() {
    return {
      langs: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" }
      ],
      sources: ["GIOS", "Airly", ""]
    };
  },
  methods: {
    handleGeolocation() {
      localize();
      this.$router.push("/");
    },
    handleLanguageChange(language) {
      this.$i18n.locale = language;
      setLanguage(language);
    },
    handleSourceChange(source) {
      setSource(source);
      this.$store.dispatch("map/removeStations");
    }
  }
};
</script>

<style lang="scss"></style>
