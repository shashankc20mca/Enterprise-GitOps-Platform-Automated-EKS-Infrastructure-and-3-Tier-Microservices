const express = require("express");
const Record = require("../models/Record");
const { auth } = require("../middleware/auth");

const router = express.Router();

// All routes require login
router.use(auth);

// GET /api/records
router.get("/", async (req, res) => {
  const records = await Record.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
  res.json(records);
});

// POST /api/records
router.post("/", async (req, res) => {
  const { title, department, status } = req.body || {};
  if (!title) return res.status(400).json({ message: "title required" });

  const rec = await Record.create({
    ownerId: req.user.userId,
    title,
    department: department || "",
    status: status || "active"
  });

  res.status(201).json(rec);
});

// PUT /api/records/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, department, status } = req.body || {};

  const rec = await Record.findOne({ _id: id, ownerId: req.user.userId });
  if (!rec) return res.status(404).json({ message: "Not found" });

  if (title !== undefined) rec.title = title;
  if (department !== undefined) rec.department = department;
  if (status !== undefined) rec.status = status;

  await rec.save();
  res.json(rec);
});

// DELETE /api/records/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const rec = await Record.findOneAndDelete({ _id: id, ownerId: req.user.userId });
  if (!rec) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
});

module.exports = router;
