<template>
  <page-template page-title="Список тендеров" class="tender-list-page">
    <template #page-loading> ...loading </template>

    <template #page-empty>Список тендеров пуст</template>

    <template #default> </template>
  </page-template>
</template>

<script setup lang="ts">
import PageTemplate from "shared/page-template";

defineOptions({
  name: "tender-list-page",
});
</script>
