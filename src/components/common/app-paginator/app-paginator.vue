<template>
  <div class="paginator">
    <template v-if="currentPage >= maxVisiblePages + 1">
      <base-button class="paginator__item" @click="setPage(1)"> 1 </base-button>
      <div class="paginator__dots">...</div>
    </template>

    <base-button
      v-for="visiblePage in visiblePages"
      :key="visiblePage"
      class="paginator__item"
      :class="{ 'paginator__item--current': visiblePage === currentPage }"
      @click="setPage(visiblePage)"
    >
      {{ visiblePage }}
    </base-button>

    <template v-if="totalPages - currentPage >= maxVisiblePages">
      <div class="paginator__dots">...</div>
      <base-button class="paginator__item" @click="setPage(totalPages)">
        {{ totalPages }}
      </base-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import BaseButton from "ui/base-button";

import generateRange from "utils/range";

defineOptions({
  name: "app-paginator",
});

const { maxVisiblePages = 3, ...props } = defineProps<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxVisiblePages?: number;
}>();

const emit = defineEmits<{
  (e: "page-changed", page: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const visiblePages = computed(() => {
  if (totalPages.value <= maxVisiblePages) {
    return generateRange(1, totalPages.value);
  }

  if (props.currentPage <= maxVisiblePages) {
    return generateRange(1, maxVisiblePages + 1);
  } else if (totalPages.value - props.currentPage < maxVisiblePages) {
    return generateRange(totalPages.value - maxVisiblePages, totalPages.value);
  } else {
    return generateRange(props.currentPage - 1, props.currentPage + 1);
  }
});

const setPage = (page: number) => {
  emit("page-changed", page);
};
</script>

<style lang="scss">
.paginator {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  &__item {
    flex-shrink: 0;
    min-width: 40px;

    &--current {
      border-color: red;
      color: red;
      font-weight: 600;
    }
  }

  &__dots {
    padding: 10px;
    text-align: center;
  }
}
</style>
