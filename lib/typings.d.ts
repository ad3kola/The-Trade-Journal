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

export interface FormSchemaWithRefID {
  id: string;
  data: z.infer<typeof formSchema>;
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

export interface Profits {
  date: string;
  profit: number;
}

export interface Losses {
  date: string;
  Loss: number;
}

export interface PnLOverviewCharts {
  Profits_Array: Profits[];
  Total_Loss: string;
  Total_Profit: string;
  Realized_PnL: string;
}

export interface PnLDetails {
    date: string; value: number | null,
}

export interface AccountTypeProps {
  personalPnL: {
    name: string;
    totalPnL: number;
    date: PnLDetails | null
  };
  propFirmPnL: {
    name: string;
    value: number;
    data: PnLDetails | null
  };
}
