import { ObjectId } from "mongodb";
import { EmailLog } from "../../../domain/entities";
import { getDB } from "../config/config";

class EmailLogRepository {
  private collectionName: string = 'emailLogs';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(logData: EmailLog) {
    const collection = this.getCollection();
    const result = await collection.insertOne(logData);
    return result.insertedId;
  }

  async findLogsByRecipient(email: string) {
    const collection = this.getCollection();
    return collection.find({ to: email }).toArray();
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const emailLogRepository = new EmailLogRepository();
