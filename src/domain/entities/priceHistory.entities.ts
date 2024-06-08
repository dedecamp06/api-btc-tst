export class PriceHistory {
    constructor(
      public date: Date,
      public buyPrice: number,
      public sellPrice: number,
      public id?: string
    ) {}
  }
  