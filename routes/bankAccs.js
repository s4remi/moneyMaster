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

  try {
    const result = await myDB.updateBankAccount(id, updatedData);
    console.log(`Updated bank account with ID ${id}:`, result);
    res.json(result);
  } catch (error) {
    console.error(`Error updating bank account with ID ${id}:`, error);
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

export default router;
