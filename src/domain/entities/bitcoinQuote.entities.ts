export class BitcoinQuote {
    constructor(
      public buyPrice: number,
      public sellPrice: number,
      public date: Date,
      public id?: string
    ) {}
  }
  