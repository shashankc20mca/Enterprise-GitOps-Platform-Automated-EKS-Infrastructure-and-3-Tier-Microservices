const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, default: "", trim: true },
    status: { type: String, default: "active", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
