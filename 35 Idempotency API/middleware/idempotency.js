// middleware/idempotency.js
const Idempotency = require("../models/Idempotency");

module.exports = async (req, res, next) => {
  const key = req.headers["idempotency-key"];

  if (!key) return res.status(400).json({ error: "Idempotency-Key header missing" });

  // Check existing entry
  const existing = await Idempotency.findOne({ key });
  if (existing) {
    console.log("Returning cached response for key:", key);
    return res.status(200).json(existing.response);
  }

  // Attach key to request for later use
  req.idempotencyKey = key;

  next();
};
