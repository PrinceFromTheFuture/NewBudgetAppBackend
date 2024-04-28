export interface newActionFormInteface {
  title: string;
  source: string;
  budget: string;
  amount: number;
  date: string;
  type: string;
}

export interface sourceInterface {
  name: string;
  balance: number;
  color: string;
}
export interface budgetInterface {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}
