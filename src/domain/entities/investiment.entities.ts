export class Investment {
    constructor(
      public userId: string,
      public bitcoinAmount: number,
      public investmentValue: number,
      public purchaseDate: Date,
      public currentBitcoinPrice?: number, 
      public id?: any
    ) {}
  }
  