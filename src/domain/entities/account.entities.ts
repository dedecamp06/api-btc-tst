export class Account {
    constructor(
      public userId: string,
      public balance: number = 0, 
      public id?: string
    ) {}
  }
  