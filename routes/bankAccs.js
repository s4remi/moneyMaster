import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

router.post("/api/bankAccs", async (req, res) => {
  const postResult = await myDB.createProject(req.body);
  if (postResult) {
    res.send(postResult);
  }
});
export default router;
