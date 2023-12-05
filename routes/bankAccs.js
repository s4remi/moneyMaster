import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

router.post("/api/bankAccs", async (req, res) => {
  const postResult = await myDB.createBankAccount(req.body, req);
  if (postResult) {
    res.send(postResult);
  }
});

// PUT (update) a specific data by ID
router.put("/api/bankAccs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(`Received update request for bank account with ID ${id}`);
  console.log("in router.put. Updated data:", updatedData);

  try {
    const usernameUpdate = req.user?.username;
    console.log(
      "in try&catch, router.put. Username for update:",
      usernameUpdate
    );

    if (!usernameUpdate) {
      console.error("in the router. User is not authenticated");
      res
        .status(401)
        .json({ error: "in the router., User is not authenticated" });
      return;
    }

    const result = await myDB.updateBankAccount(
      id,
      updatedData,
      usernameUpdate,
      req
    );

    if (!result) {
      console.error("In Router,Bank account not found for update.");
      res
        .status(404)
        .json({ error: "In Router, Bank account not found for update" });
      return;
    }

    console.log(`IN ROUTER, Updated bank account with ID ${id}:`, result);
    res.json(result);
  } catch (error) {
    console.error(
      `IN ROUTER Error updating bank account with ID ${id}:`,
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a specific data by ID
router.delete("/api/bankAccs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usernameDelete = req.user?.username || null;
    const result = await myDB.deleteBankAccount(id, usernameDelete, req);
    console.log(`Deleted bank account with ID ${id}:`, result);
    res.json(result);
  } catch (error) {
    console.error(`Error deleting bank account with ID ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/api/bankAccs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await myDB.getBankAccountById(id);

    if (result) {
      res.json(result);
    } else {
      console.error(`Bank account with ID ${id} not found.`);
      res.status(404).json({ error: "Bank account not found" });
    }
  } catch (error) {
    console.error(`Error fetching bank account with ID ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
