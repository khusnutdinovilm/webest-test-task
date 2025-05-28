<template>
  <page-template
    page-title="Список тендеров"
    :is-content-loading="isContentLoading"
    :is-content-empty="isContentEmpty"
    class="tender-list-page"
  >
    <template #page-loading>
      <div class="tender-list-page__items">
        <tender-card-skeleton v-for="i in 30" :key="i" />
      </div>
      <app-paginator
        :current-page="4"
        :items-per-page="3"
        :total-items="28"
        class="tender-list-page__paginator"
      />
    </template>

    <template #page-empty>Список тендеров пуст</template>

    <template #default>
      <div class="tender-list-page__items">
        <tender-card v-for="tender in tenderStore.tenderList" :key="tender.id" :tender="tender" />
      </div>

      <app-paginator
        :current-page="currentPage"
        :items-per-page="tenderStore.pageSize"
        :total-items="tenderStore.totalItems"
        class="tender-list-page__paginator"
        @page-changed="changePage"
      />
    </template>
  </page-template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppPaginator from "common/app-paginator";

import PageTemplate from "shared/page-template";

import { TenderCard, TenderCardSkeleton } from "modules/tender-module/components/tender-card";
import useTenderStore from "modules/tender-module/store/use-tender-store";

defineOptions({
  name: "tender-list-page",
});

const route = useRoute();
const router = useRouter();

const currentPage = computed(() => Number(route.query.page) || 1);
watch(currentPage, () => {
  fetchTenderList();
});

const tenderStore = useTenderStore();

const isContentLoading = ref(false);
const isContentEmpty = computed(() => !tenderStore.tenderList.length);

const fetchTenderList = async () => {
  isContentLoading.value = true;
  try {
    await tenderStore.getTenderList(currentPage.value);
  } catch (error) {
    console.error(error);
  } finally {
    isContentLoading.value = false;
  }
};

const changePage = (page: number) => {
  router.push({
    name: "tender-list-page",
    query: {
      ...route.query,
      page,
    },
  });
};

onMounted(() => {
  fetchTenderList();
});
</script>

<style lang="scss">
.tender-list-page {
  & .page__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;

    & .tender-card {
      height: 300px;
    }
  }

  &__paginator {
    align-self: center;
    margin-bottom: 20px;
  }
}
</style>
