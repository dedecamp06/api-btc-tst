import { ObjectId } from "mongodb";
import { Investment } from "../../../domain/entities";
import { getDB } from "../config/config";

class InvestmentRepository {
  private collectionName: string = 'investments';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(investmentData: Investment) {
    const collection = this.getCollection();
    const result = await collection.insertOne(investmentSA);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUserId(userId: string) {
    const collection = this.getCollection();
    return collection.find({ userId }).toArray();
  }

  async update(id: string, updates: Partial<Investment>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const investmentRepository = new InvestmentRepository();
