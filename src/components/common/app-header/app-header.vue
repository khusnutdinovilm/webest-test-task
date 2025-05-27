<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <app-brand class="app-header__brand" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppBrand from "common/app-brand";

defineOptions({
  name: "app-header",
});
</script>
