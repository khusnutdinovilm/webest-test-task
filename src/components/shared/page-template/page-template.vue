<template>
  <main class="page">
    <div class="page__header container">
      <h2 class="page__title">
        {{ pageTitle }}
      </h2>
    </div>

    <div class="page__content container" :class="pageContentClasses">
      <slot v-if="isContentLoading" name="page-loading" />
      <slot v-else-if="isContentEmpty" name="page-empty" />
      <slot v-else />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "page-template",
});

const props = defineProps<{
  pageTitle: string;
  isContentLoading?: boolean;
  isContentEmpty?: boolean;
}>();

const pageContentClasses = computed(() => ({
  "page__content--loading": props.isContentLoading,
  "page__content--empty": !props.isContentLoading && props.isContentEmpty,
}));
</script>
