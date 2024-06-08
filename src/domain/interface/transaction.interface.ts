export interface TransactionInterface {
  accountId: string;
  type: "deposit" | "purchase" | "sale";
  amount: number;
  date: Date;
  bitcoinAmount?: number;
  transactionId?: string;
}

