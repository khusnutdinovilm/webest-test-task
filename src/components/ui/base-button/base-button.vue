<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-button",
});
</script>

<style lang="scss">
.base-button {
  background-color: orange;
  padding: 10px;
  border-radius: 12px;
}
</style>
