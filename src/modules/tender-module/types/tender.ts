export interface ITenderItem {
  id: string;
  date: string;
  deadline_date: string;
  deadline_length_days: string;
  title: string;
  category: string;
  description: string;
  phase: string;
  phase_en: string;
  place: string;
  sid: string;
  eid: string;
  awarded_value: string;
  awarded_currency: string;
  awarded_value_eur: string;
  data: ITenderData;
  purchaser: IPurchaser;
  type: ITenderType;
  notices: ITenderNotice;
  awarded: ITenderAwarded[];
}

export interface IPurchaser {
  id: number;
  sid: number;
  name: string;
}

export interface ITenderType {
  id: string;
  name: string;
  slug: string;
}

export interface ITenderData {
  initial_estimated: string;
  final: string;
  currency: string;
}

export interface ITenderNotice {
  SZERZODESSEL_KAPCSOLATOS_INFORMACIOK_BLOKK: unknown[];
  OSSZEGZES_AJANLAT_ELBIRALAS_BLOKK: unknown[];
  ELOZETES_VITARENDEZES_BLOKK: unknown[];
}

export interface ITenderAwarded {
  date: string;
  suppliers_id: number;
  value: number;
  count: number;
  suppliers_name: string;
  suppliers: unknown;
  value_eur: number;
  value_for_one: number;
  value_for_one_eur: number;
  value_for_two: number;
  value_for_two_eur: number;
  value_for_three: number;
  value_for_three_eur: number;
  offers_count_data: object;
  offers_count: unknown[];
}
