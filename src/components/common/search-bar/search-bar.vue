<template>
  <div class="search-bar">
    <base-input id="search-bar" v-model="query" class="search-bar__base-input" @enter="search" />

    <base-button class="search-bar__base-button" @click="search">
      <loupe-icon />
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import LoupeIcon from "icons/loupe-icon.vue";

import BaseButton from "ui/base-button";
import BaseInput from "ui/base-input";

defineOptions({
  name: "search-bar",
});

const route = useRoute();
const router = useRouter();

const query = ref("");

const querySearch = computed(() => route.query.search as string);
watch(querySearch, newSearch => {
  query.value = newSearch;
});

const search = () => {
  if (querySearch.value === query.value) return;

  router.push({
    name: "tender-list-page",
    query: {
      search: query.value,
    },
  });
};

onMounted(() => {
  query.value = (route.query.search as string) ?? "";
});
</script>

<style lang="scss">
.search-bar {
  display: flex;
  flex-flow: row nowrap;

  &__base-input {
    height: 100%;

    & .base-input__field {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__base-button.base-button {
    width: 41px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: #ffffff;

    & svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
