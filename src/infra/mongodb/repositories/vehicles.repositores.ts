import { ObjectId } from "mongodb";
import { Vehicle } from "../../../domain/entities";
import { getDB } from "../config/config";

class VehicleRepository {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private getCollection() {
    const db = getDB();
    return db.collection(this.collectionName);
  }

  async create(vehicleData: Vehicle) {
    const collection = this.getCollection();
    const result = await collection.insertOne(vehicleData);
    return result.insertedId;
  }

  async findOne(id: string) {
    const collection = this.getCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async find() {
    const collection = this.getCollection();
    return collection.find({}).toArray();
  }

  async update(id: string, updates: Partial<Vehicle>) {
    const collection = this.getCollection();
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  }

  async delete(id: string) {
    const collection = this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const vehicleRepository = new VehicleRepository("vehicles");
