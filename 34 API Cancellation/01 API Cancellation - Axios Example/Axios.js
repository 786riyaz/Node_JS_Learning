// server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { resolve } = require("path");

const app = express();
app.use(cors()); // enable CORS for all origins
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "amazon"; // as requested
const COLL_NAME = "products"; // as requested

async function start() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db(DB_NAME);
  const coll = db.collection(COLL_NAME);

  // simple route
  app.get("/api/search", async (req, res) => {
    const q = (req.query.q || "").trim();
    console.log("Received search request:", q);

    const controller = new AbortController();

    // Only fire when browser aborts (Axios cancellation)
    req.on("aborted", () => {
      console.log("Client aborted the request — aborting DB work.");
      controller.abort();
    });

    if (!q) return res.json([]);

    try {
      // console.log("Searching for:", q);
      // const filter = { productName: { $regex: q, $options: "i" } };
      const filter = {
        $or: [
          { productName: { $regex: q, $options: "i" } },
          { brandName: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
        ],
      };

      const cursor = coll.find(filter).limit(20);
      // console.log("Query sent to MongoDB", filter);
      // console.log("Waiting for results…");

      // const products = await cursor.toArray();
      controller.signal.addEventListener("abort", () => {
        cursor.close().catch(() => {});
      });

      await new Promise(resolve => setTimeout(resolve, 4000)); // simulate delay

      const products = await cursor.toArray();
      console.log("Result cursor obtained.", products);

      if (controller.signal.aborted) {
        console.log("Query aborted — no response sent.");
        return;
      }

      res.json(products);
    } catch (err) {
      if (controller.signal.aborted) {
        console.log("Query aborted cleanly.");
        return;
      }
      console.error("Search error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  const port = 5500;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
