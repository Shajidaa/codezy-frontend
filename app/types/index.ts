export type Currency = "BDT" | "USD";

export interface BootcampPlan {
  month: string;
  focus: string;
  detail: string;
}

export interface LevelData {
  id: string;
  label: string;
  title: string;
  shortDesc: string;
  priceBDT: string;
  priceUSD: string;
  benefits: string[];
  plan: BootcampPlan[];
  additional: string;
  image: string;
  icon: string;
}