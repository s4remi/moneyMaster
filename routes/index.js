import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

/* GET home page. */
router.get("/api/data", async function (req, res) {
  const datas = await myDB.getDatas();
  console.log("IN INDEX.JS. Data from MongoDB:", datas);
  res.json(datas);
});

export default router;
