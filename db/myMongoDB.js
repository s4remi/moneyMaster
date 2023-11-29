import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
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
    const queryObj = { account_number: { $regex: `${query}`, $options: "i" } };
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
  myDB.logUserActivity = async function (activity) {
    const { client, db } = connect();

    try {
      activity.timestamp = new Date().toISOString();
      await db.collection("activity").insertOne(activity);
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

  /*
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
  */
  myDB.createBankAccount = async (bankObject, req) => {
    const { client, db } = connect();
    try {
      console.log("Creating project...");
      const result = await db.collection("datas").insertOne(bankObject);
      // console.log("created bank account");
      const usernameCreate = await myDB.getUserByUsername(req.user.username);
      // Log the creation activity
      const activityLog = {
        username: usernameCreate
          ? usernameCreate.username
          : bankObject.account_name,
        action: "create",
        objectType: "bank_account",
        objectId: result.insertedId.toString(),
        timestamp: new Date().toISOString(),
        changes: {
          /* Include any additional information about the creation */
        },
      };
      await myDB.logUserActivity(activityLog);
      console.log("created bank account");
      return result;
    } finally {
      await client.close();
    }
  };

  myDB.deleteBankAccount = async (bankId) => {
    let client;
    try {
      console.log("Deleting bank account");
      client = new MongoClient(connection_url, { useUnifiedTopology: true });
      await client.connect();
      console.log("connecting to the db");
      const db = client.db("monyMaster");
      const datasCollection = db.collection("datas");
      const result = await datasCollection.findOneAndDelete({
        _id: new ObjectId(bankId),
      });
      console.log("deleted bank account", result);
    } finally {
      client.close();
    }
  };

  myDB.updateBankAccount = async (bankId, updatedData) => {
    const { client, db } = connect();
    try {
      console.log("Updating bank account with ID:", bankId);
      const result = await db
        .collection("datas")
        .findOneAndUpdate(
          { _id: new ObjectId(bankId) },
          { $set: updatedData },
          { returnDocument: "after" }
        );
      console.log("Updated bank account:", result.value);
      return result.value;
    } finally {
      await client.close();
    }
  };

  return myDB;
}
const myDB = MyMongoDB();
export default myDB;
