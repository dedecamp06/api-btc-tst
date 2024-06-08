import { ObjectId } from "mongodb";
import { BitcoinQuote } from "../../../domain/entities";
import { getDB } from "../config/config";

class BitcoinQuoteRepository {
  private collectionName: string = 'bitcoinQuotes';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(quoteData: BitcoinQuote) {
    const collection = this.getCollection();
    const result = await collection.insertOne(quoteData);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findLatest() {
    const collection = this.getCollection();
    return collection.find().sort({ date: -1 }).limit(1).toArray();
  }

  async update(id: string, updates: Partial<BitcoinQuote>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const bitcoinQuoteRepository = new BitcoinQuoteRepository();
