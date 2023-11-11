import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const connection_url = process.env.MONGO_URI;

  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`thi is a connection url: ${connection_url}`);
    const db = client.db("moneyMaster");
    return { client, db };
  };

  myDB.getDatas = async function (query = {}) {
    const { client, db } = connect();
    try {
      const datas = await db.collection("data").find(query).toArray();
      return datas;
    } finally {
      await client.close();
    }
  };

  // myDB.getUser = async (query = {}) => {
  //   const { client, db } = connect();
  //   const userCollection = db.collection("users");
  //   try {
  //     return userCollection.findOne(query);
  //   } catch (e) {
  //     await client.close();
  //   }
  // };
  // myDB.createUser = async (doc = {}) => {
  //   const { client, db } = connect();
  //   const userCollection = db.collection("users");
  //   try {
  //     return userCollection.insertOne(doc);
  //   } catch (e) {
  //     await client.close();
  //   }
  // };

  return myDB;
}
const myDB = MyMongoDB();
export default myDB;
