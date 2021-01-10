<template>
  <Modal class="modal" :z-index="1004">
    <h2 class="h2">{{ $t("Smog map") }}</h2>
    <p class="p">
      {{ $t("Points on the map show measuring stations. Their colors depend on the surrounding air quality. Eg.:") }}
    </p>
    <div class="quality-index mb8">
      <QualityIndexIndicator quality-index-level="Bardzo dobry" class="mr8" />
      <span> - {{ $t("Very good") }}</span>
    </div>
    <p class="p">
      {{
        $t('Choosing the points shows more specific data about smog. More information is available in "Info" section.')
      }}
    </p>
    <section>
      <h2 class="h2">{{ $t("Language") }}</h2>
      <p>
        {{ $t("Choose language.") }}
      </p>
      <div class="mb24">
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
    <div class="badge error mb16">
      {{
        $t(
          "Due to using free Heroku server first API data load may take above 1 minute. Next visits will be performed faster."
        )
      }}
    </div>
    <ButtonFull class="w100" @submit="hideModal">
      {{ $t("Go to app") }}
    </ButtonFull>
  </Modal>
</template>

<script>
import { mapState } from "vuex";
import ButtonFull from "@/components/ui/ButtonFull.vue";
import ButtonRadio from "@/components/ui/ButtonRadio.vue";
import Modal from "@/components/ui/Modal.vue";
import QualityIndexIndicator from "@/components/ui/QualityIndexIndicator.vue";

export default {
  name: "LandingModal",
  components: {
    ButtonFull,
    ButtonRadio,
    Modal,
    QualityIndexIndicator
  },
  data() {
    return {
      langs: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" }
      ]
    };
  },
  computed: {
    ...mapState({
      root: state => state.root
    }),
    isModalVisible() {
      return !this.root.landingModal;
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch("root/setLandingModal", true);
    },
    handleLanguageChange(language) {
      this.$i18n.locale = language;
      this.$store.dispatch("root/setLanguage", language);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  min-width: 300px;
  max-width: 600px;
}

.quality-index {
  display: flex;
}

.badge.error {
  border-radius: 8px;
  background-color: #ff1e1e;
  color: #ffffff;
  font-size: 11px;
  padding: 8px;
}
</style>
