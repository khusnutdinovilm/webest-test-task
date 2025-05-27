<template>
  <app-header />

  <router-view />
</template>

<script setup lang="ts">
import AppHeader from "common/app-header";
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-height: 100dvh;

  & main {
    flex: 1;
  }
}
</style>
