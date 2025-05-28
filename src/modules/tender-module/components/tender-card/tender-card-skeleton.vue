<template>
  <div class="tender-card tender-card--skeleton">
    <div class="tender-card__title skeleton skeleton--text"></div>

    <div class="tender-card__description">
      <div class="skeleton skeleton--text"></div>
      <div class="skeleton skeleton--text" style="width: 75%"></div>
      <div class="skeleton skeleton--text"></div>
      <div class="skeleton skeleton--text" style="width: 50%"></div>
      <div class="skeleton skeleton--text" style="width: 25%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "tender-card-skeleton",
});
</script>
