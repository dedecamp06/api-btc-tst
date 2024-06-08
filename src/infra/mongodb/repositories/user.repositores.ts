import { ObjectId } from "mongodb";
import { User } from "../../../domain/entities";
import { getDB } from "../config/config";

class UserRepository {
  private collectionName: string = 'users';

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(userData: User) {
    const collection = this.getCollection();
    const result = await collection.insertOne(userData);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByEmail(email: string) {
    const collection = this.getCollection();
    return collection.findOne({ email });
  }

  async update(id: string, updates: Partial<User>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const userRepository = new UserRepository();
