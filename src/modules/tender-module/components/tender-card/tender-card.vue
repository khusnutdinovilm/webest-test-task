<template>
  <div class="tender-card" @click.prevent="goToTenderDetailPage">
    <div class="tender-card__title">
      {{ tender.title }}
    </div>

    <div class="tender-card__description">
      {{ tender.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import type { ITenderItem } from "modules/tender-module/types/tender";

defineOptions({
  name: "tender-card",
});

const props = defineProps<{
  tender: ITenderItem;
}>();

const router = useRouter();

const goToTenderDetailPage = () => {
  router.push({
    name: "tender-detail-page",
    params: {
      tender_id: props.tender.id,
    },
  });
};
</script>

<style lang="scss"></style>
