import express from "express";
import myDB from "../db/myMongoDB.js";

let router = express.Router();

/* GET home page. */
router.get("/api/data", async function (req, res) {
  // Consider validating the input
  const query = req.query.query || "";

  console.log("/api/data query", query);

  try {
    const datas = await myDB.getDatas({ query });
    console.log("got Data", datas.length);
    res.status(200).json({ datas });
  } catch (err) {
    console.log("error getting Data", err);
    return res.status(400).json({ error: err });
  }
});

export default router;
