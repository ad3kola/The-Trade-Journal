import { formSchema } from "@/config/zod";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavLinks {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  url: string;
}

export interface TopRowData {
  title: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  value: string;
}

export interface DailySummaryData {
  date: string;
  trades: number;
  winRate: number;
  realizedPnL: number;
  roi: number;
  id: number;
  equity: number;
  coinTicker: string;
  risk: number;
  direction: string;
  image: string;
  entryPrice: number;
  exitPrice: number;
  riskFactors: number;
  timeWindow: string;
  divergence: true;
  headAndShoulders: true;
  proTrendBias: false;
  trades: number;
  trendlineRetest: true;
}
export interface CoinsList {
  name: string;
  logo: string;
  value: string;
}

export interface FormSchemaWithRefID {
  docID: string,
  data: z.infer<typeof formSchema>,
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}

export interface UserProps {
  email: string;
  name?: string;
  password: string;
  id?: string;
}
