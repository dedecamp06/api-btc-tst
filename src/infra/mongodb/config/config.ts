import { MongoClient } from "mongodb";

//url para usar como local
// const url = "mongodb://root:example@localhost:27017";

//url para usar no docker
const url = "mongodb://root:example@mongodb:27017";
const dbName = "vehiclesDB";

let dbInstance: MongoClient;

export const connectDB = async () => {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to MongoDB");
  dbInstance = client;
  return client.db(dbName);
};

export const getDB = () => {
  if (!dbInstance) {
    throw new Error("DB must be initialized first");
  }
  return dbInstance.db(dbName);
};
