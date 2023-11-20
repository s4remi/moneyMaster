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
  myDB.createBankAccount = async (bankObject) => {
    const { client, db } = connect();
    try {
      console.log("Creating project...");
      const result = await db.collection("datas").insertOne(bankObject);
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
      console.log("deleted bank account");
    } finally {
      client.close();
    }
  };

  myDB.updateBankAccount = async (bankId, newName, newDescription) => {
    let client;
    try {
      console.log("Updating bank account");
      client = new MongoClient(connection_url, { useUnifiedTopology: true });
      await client.connect();
      console.log("connecting to the db");
      const db = client.db("moneyMaster");
      const datasCollection = db.collection("datas");
      const result = await datasCollection.findOneAndUpdate(
        {
          _id: new ObjectId(bankId),
        },
        {
          $set: {
            projectName: newName,
            projectDescription: newDescription,
          },
        }
      );
      console.log("got bank account");
      return result;
    } finally {
      client.close();
    }
  };

  return myDB;
}
const myDB = MyMongoDB();
export default myDB;

// myDB.getUserBankAccounts = async function (userId) {
//   let client;
//   try {
//     console.log("Getting bank accounts...");
//     client = new MongoClient(connection_url, { useUnifiedTopology: true });
//     await client.connect();
//     console.log("Connecting to DB...");
//     const db = client.db("monyMaster");
//     const datasCollection = db.collection("datas");
//     const results = await datasCollection.find({ ownerId: userId }).toArray();
//     console.log("got user's bank accounts");
//     return results;
//   } finally {
//     client.close();
//   }
// };

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
