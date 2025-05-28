import { defineStore } from "pinia";
import { ref } from "vue";

import TenderService from "modules/tender-module/service/tender-service";
import type { ITenderItem } from "modules/tender-module/types/tender";

export default defineStore("tender-store", () => {
  const tenderService = new TenderService("https://api.test-webest.ru");

  const tenderList = ref<ITenderItem[]>([]);
  const totalItems = ref(0);
  const pageSize = ref(0);

  const getTenderList = async (page: number) => {
    const { data, total, page_size } = await tenderService.getTenderList(page);

    tenderList.value = [...data];
    totalItems.value = total;
    pageSize.value = page_size;
  };

  const getTenderItem = async (tender_id: ITenderItem["id"]) => {
    return await tenderService.getTenderItem(tender_id);
  };

  return {
    tenderList,
    totalItems,
    pageSize,
    getTenderList,
    getTenderItem,
  };
});
