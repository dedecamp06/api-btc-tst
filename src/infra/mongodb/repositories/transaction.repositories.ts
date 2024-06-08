import { ObjectId } from "mongodb";
import { Transaction } from "../../../domain/entities";
import { getDB } from "../config/config";

class TransactionRepository {
  private collectionName: string = 'transactions';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(transactionData: Transaction) {
    const collection = this.getCollection();
    const result = await collection.insertOne(transactionData);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByAccountId(accountId: string) {
    const collection = this.getCollection();
    return collection.find({ accountId }).toArray();
  }

  async update(id: string, updates: Partial<Transaction>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
.djangotemplates.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const transactionRepository = new TransactionRepository();
