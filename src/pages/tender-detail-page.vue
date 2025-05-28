<template>
  <page-template
    :page-title="tenderPageTitle"
    :is-content-loading="isContentLoading"
    :is-content-empty="isContentEmpty"
    class="tender-detail-page"
  >
    <template #page-loading>
      <div class="tender-detail-page__description">
        <div
          v-for="i in 20"
          :key="i"
          class="skeleton skeleton--text"
          style="margin-bottom: 5px"
        ></div>
        <div class="skeleton skeleton--text" style="width: 75%"></div>
      </div>
    </template>

    <template #page-empty>
      <div>Не удалось получить информацию по тендеру</div>
      <div class="tender-detail-page__back" @click="$router.push({ name: 'tender-list-page' })">
        Вернуться на главную
      </div>
    </template>

    <template #default>
      <div class="tender-detail-page__back" @click="$router.back()">Вернуться назад</div>
      <div class="tender-detail-page__description">
        {{ tender?.description }}
      </div>
    </template>
  </page-template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import PageTemplate from "shared/page-template";

import useTenderStore from "modules/tender-module/store/use-tender-store";
import type { ITenderItem } from "modules/tender-module/types/tender";

defineOptions({
  name: "tender-detail-page",
});

const route = useRoute();

const tenderStore = useTenderStore();

const tender = ref<ITenderItem | null>(null);

const isContentLoading = ref(true);
const isContentEmpty = computed(() => tender.value === null);

const tenderPageTitle = computed(() =>
  isContentLoading.value
    ? "Загружаем..."
    : isContentEmpty.value
      ? "Не удалось получить информацию по тендеру"
      : (tender.value?.title as string),
);

onMounted(async () => {
  try {
    const tender_id = route.params.tender_id;

    if (!tender_id || typeof tender_id !== "string") {
      throw new Error("");
    }

    tender.value = await tenderStore.getTenderItem(tender_id);
  } catch (error) {
    console.error(error);
  } finally {
    isContentLoading.value = false;
  }
});
</script>

<style lang="scss">
.tender-detail-page {
  & .page__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__back {
    color: blue;
    cursor: pointer;
  }
}
</style>
