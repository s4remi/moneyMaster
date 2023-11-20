import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

router.post("/api/bankAccs", async (req, res) => {
  const postResult = await myDB.createBankAccount(req.body);
  if (postResult) {
    res.send(postResult);
  }
});

// PUT (update) a specific data by ID
router.put("/api/bankAccs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await myDB.updateBankAccount(id, updatedData);
  res.json(result);
});

// DELETE a specific data by ID
router.delete("/api/bankAccs/:id", async (req, res) => {
  const { id } = req.params;
  const result = await myDB.deleteBankAccount(id);
  res.json(result);
});
export default router;

/*
get all of the users projects
router.get("/:id", async (req, res) => {
  const bankArray = await myDB.getUserBankAccounts(req.params.id);
  if (bankArray) {
    res.send(bankArray);
  }
});
*/
