import CachedApi from "api/cached-api";

import type { ITenderItem } from "modules/tender-module/types/tender";

interface ITenderListRes {
  page_count: number;
  page_number: number;
  page_size: number;
  total: number;
  data: ITenderItem[];
}

const CLIENT_PAGE_SIZE = 30;
const SERVER_PAGE_SIZE = 100;

export default class TenderService extends CachedApi {
  constructor(baseUrl: string, options?: { maxSize?: number; ttl?: number }) {
    super(baseUrl, options);
  }

  async getTenderList(clientPage: number): Promise<ITenderListRes> {
    const serverPage = Math.ceil((clientPage * CLIENT_PAGE_SIZE) / SERVER_PAGE_SIZE);

    const start = ((clientPage - 1) * CLIENT_PAGE_SIZE) % SERVER_PAGE_SIZE;
    const end = start + CLIENT_PAGE_SIZE;

    const { total, data: tenderList } = await this.getCached<ITenderListRes>(
      `/list/?page=${serverPage}`,
    );

    const result: ITenderListRes = {
      page_count: Math.ceil(total / CLIENT_PAGE_SIZE),
      page_number: clientPage,
      total: total,
      page_size: CLIENT_PAGE_SIZE,
      data: tenderList.slice(start, end),
    };

    if (end < SERVER_PAGE_SIZE) {
      return result;
    } else {
      const { data } = await this.getCached<ITenderListRes>(`/list/?page=${serverPage - 1}`);
      return {
        ...result,
        data: [...result.data, ...data.slice(0, end - SERVER_PAGE_SIZE)],
      };
    }
  }

  async getTenderItem(tender_id: string): Promise<ITenderItem> {
    return await this.get(`/element/?id=${tender_id}`);
  }
}
