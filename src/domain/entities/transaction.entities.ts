export class Transaction {
    constructor(
      public accountId: string,
      public type: 'deposit' | 'purchase' | 'sale',
      public amount: number,
      public date: Date,
      public id?: string
    ) {}
  }