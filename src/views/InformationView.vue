<template>
  <div class="page">
    <header>
      <h1 class="h1">{{ $t("Information") }}</h1>
      <p class="p">{{ $t("Author") }}: Jakub Makiełkowski</p>
      <a class="link" href="https://github.com/jakubmakielkowski">https://github.com/jakubmakielkowski</a>
    </header>
    <section>
      <h2 class="h2">{{ $t("How to use?") }}</h2>
      <h4 class="h4">{{ $t("Map") }}</h4>
      <p class="p">
        {{ $t("Points on the map show measuring stations. Their colors depend on the surrounding air quality. Eg.:") }}
      </p>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Bardzo dobry" class="mr8" />
        <span> - Bardzo dobry</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Dobry" class="mr8" />
        <span> - Dobry</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Umiarkowany" class="mr8" />
        <span> - Umiarkowany</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Dostateczny" class="mr8" />
        <span> - Dostateczny</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Zły" class="mr8" />
        <span> - Zły</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Bardzo zły" class="mr8" />
        <span> - Bardzo zły</span>
      </div>
      <div class="quality-index mb8">
        <QualityIndexIndicator quality-index-level="Brak indeksu" class="mr8" />
        <span> - Brak indeksu</span>
      </div>
      <p class="p">
        {{
          $t(
            'Due to data saving, some of the points may have "No measurement" value. After choosing one of the points another users will see updated value.'
          )
        }}
      </p>
      <h4 class="h4">{{ $t("Search") }}</h4>
      <p class="p">
        {{ $t("Search allows you to find points by street or city name.") }}
      </p>
      <h4 class="h4">{{ $t("Settings") }}</h4>
      <p class="p">{{ $t("Settings allow you to") }}:</p>
      <ul class="list">
        <li>{{ $t("Find your geolocation") }}</li>
        <li>{{ $t("Choose langugage") }}</li>
        <li>{{ $t("Choose data stource") }}</li>
      </ul>
    </section>
    <section>
      <h2 class="h2">{{ $t("Chemical compounds") }}</h2>
      <p class="p">
        {{ $t("Stations cointain info about these chemical compounds") }}
      </p>

      <ul class="list">
        <li>PM10</li>
        <li>PM25</li>
        <li>C6H6</li>
        <li>CO</li>
        <li>SO2</li>
        <li>NO2</li>
        <li>O3</li>
      </ul>
    </section>
  </div>
</template>

<script>
import QualityIndexIndicator from "@/components/ui/QualityIndexIndicator.vue";

export default {
  name: "InfoView",
  components: {
    QualityIndexIndicator
  }
};
</script>

<style lang="scss">
.link {
  color: $color-primary;
}

.quality-index {
  display: flex;
}

.list {
  list-style: initial;
  padding-left: 16px;
}
</style>
