import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const connection_url = process.env.MONGO_URI;

  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`thi is a connection url: ${connection_url}`);
    const db = client.db("monyMaster");
    return { client, db };
  };

  myDB.getDatas = async function ({ query = "", limit = 20 } = {}) {
    const { client, db } = connect();
    const queryObj = { opening_date: { $regex: `${query}`, $options: "i" } };
    console.log("query data", query, queryObj);
    try {
      const datas = await db
        .collection("datas")
        .find(queryObj)
        .limit(limit)
        .toArray();
      console.log("in DB getting data", datas);

      return datas;
    } finally {
      await client.close();
    }
  };
  myDB.insertUser = async function (user) {
    const { client, db } = connect();

    console.log("insert User", user.username);
    try {
      const response = await db.collection("users").insertOne(user);

      return response;
    } finally {
      await client.close();
    }
  };
  myDB.getUserByUsername = async function (username) {
    const { client, db } = connect();

    console.log("get User", username);
    try {
      return await db.collection("users").findOne({ username });
    } finally {
      await client.close();
    }
  };

  myDB.createProject = async (bankObject) => {
    let client;
    try {
      console.log("Creating project...");
      client = new MongoClient(connection_url, { useUnifiedTopology: true });
      await client.connect();
      console.log("Connecting to monyMaster DB...");
      const db = client.db("monyMaster");
      const banksCollection = db.collection("datas");
      const result = await banksCollection.insertOne(bankObject);
      console.log("created bank account");
      return result;
    } finally {
      client.close();
    }
  };

  return myDB;
}
const myDB = MyMongoDB();
export default myDB;

/*

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
  */
