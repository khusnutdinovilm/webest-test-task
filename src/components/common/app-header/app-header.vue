<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <app-brand class="app-header__brand" />

        <search-bar class="app-header__search-bar" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppBrand from "common/app-brand";
import SearchBar from "common/search-bar";

defineOptions({
  name: "app-header",
});
</script>
