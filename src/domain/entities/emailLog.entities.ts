export class EmailLog {
    constructor(
      public to: string,
      public subject: string,
      public body: string,
      public sentDate: Date,
      public id?: string
    ) {}
  }
  