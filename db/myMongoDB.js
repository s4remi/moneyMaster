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
      //activity.timestamp = new Date().toISOString();
      const userActivity = {
        username: activity.username,
        action: activity.action,
        objectType: activity.objectType,
        objectId: activity.objectId,
        timestamp: new Date().toISOString(),
        changes: activity.changes || null,
        clientIP: activity.clientIP || null,
        userAgent: activity.userAgent || null,
      };
      await db.collection("activity").insertOne(userActivity);
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

  myDB.deleteBankAccount = async (bankId, username, req) => {
    const { client, db } = connect();
    try {
      console.log("Deleting bank account with ID:", bankId);
      const result = await db.collection("datas").findOneAndDelete({
        _id: new ObjectId(bankId),
      });

      // Log the delete activity
      const activityLog = {
        username: username,
        action: "delete",
        objectType: "bank_account",
        objectId: bankId,
        timestamp: new Date().toISOString(),
      };
      if (req) {
        activityLog.clientIP = req.ip;
        activityLog.userAgent = req.get("User-Agent");
      }

      await myDB.logUserActivity(activityLog);

      console.log("deleted bank account", result);
      return result;
    } finally {
      client.close();
    }
  };

  myDB.getBankAccountById = async function (id) {
    const { client, db } = connect();
    try {
      const result = await db
        .collection("datas")
        .findOne({ _id: new ObjectId(id) });
      return result;
    } finally {
      await client.close();
    }
  };

  myDB.updateBankAccount = async (bankId, updatedData, username, req) => {
    const { client, db } = connect();
    try {
      console.log("in myDB.updateBankAccount with ID:", bankId);
      console.log("Before update operation. Checking if document exists:", {
        _id: new ObjectId(bankId),
      });

      const existingBankAccount = await db
        .collection("datas")
        .findOne({ _id: new ObjectId(bankId) });

      if (!existingBankAccount) {
        console.log("Bank account not found for update.");
        return null;
      }

      if (username !== null && username !== undefined) {
        delete updatedData._id;
        const result = await db
          .collection("datas")
          .findOneAndUpdate(
            { _id: new ObjectId(bankId) },
            { $set: { ...updatedData } },
            { returnDocument: "after" }
          );
        console.log("After update operation. Result:", result);

        if (result.ok) {
          const updatedBankAccount = result.value;

          console.log("Update successful:", updatedBankAccount);
          const activityLog = {
            username: username,
            action: "update",
            objectType: "bank_account",
            objectId: bankId,
            timestamp: new Date().toISOString(),
            changes: updatedData,
          };

          if (req) {
            activityLog.clientIP = req.ip;
            activityLog.userAgent = req.get("User-Agent");
          }

          await myDB.logUserActivity(activityLog);
          console.log("Updated bank account:", updatedBankAccount);
          return updatedBankAccount;
        } else {
          console.log("Update failed. Result:", result);
          return null;
        }
      } else {
        console.log(
          "Username is not available. Skipping update and activity log."
        );
        return null;
      }
    } finally {
      await client.close();
    }
  };

  return myDB;
}
const myDB = MyMongoDB();
export default myDB;
