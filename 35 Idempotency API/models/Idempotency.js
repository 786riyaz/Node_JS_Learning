// models/Idempotency.js
const mongoose = require("mongoose");

const idempotencySchema = new mongoose.Schema({
  key: { type: String, unique: true },
  response: { type: Object },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // auto delete after 1 hour
});

module.exports = mongoose.model("Idempotency", idempotencySchema);
