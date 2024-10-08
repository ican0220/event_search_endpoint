/* eslint-disable prefer-const */
// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Store your MongoDB URI in an environment variable
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
