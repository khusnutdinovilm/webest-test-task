<template>
  <div class="app-brand">
    <div class="app-brand__logo">
      <img :src="imgUrl" alt="" class="app-brand__logo-image" />
    </div>

    <span class="app-brand__name"> Тестовое задание фирмы Webest </span>
  </div>
</template>

<script setup lang="ts">
import imgUrl from "assets/img/main-logo.png";

defineOptions({
  name: "app-brand",
});
</script>

<style lang="scss">
.app-brand {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 20px;

  &__logo {
    flex-shrink: 0;
    width: 50px;
    height: 50px;

    &-image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__name {
    display: none;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.375rem;

    @media screen and (min-width: 576px) {
      display: block;
    }
  }
}
</style>
