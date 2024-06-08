import { ObjectId } from "mongodb";
import { Account } from "../../../domain/entities";
import { getDB } from "../config/config";

class AccountRepository {
  private collectionName: string = 'accounts';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(accountData: Account) {
    const collection = this.getCollection();
    const result = await collection.insertOne(accountData);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUserId(userId: string) {
    const collection = this.getCollection();
    return collection.findOne({ userId });
  }

  async update(id: string, updates: Partial<Account>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const accountRepository = new AccountRepository();
