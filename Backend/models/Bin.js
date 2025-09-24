const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  binNumber: { type: String, required: true },
  color: {
    type: String,
    enum: ["blue", "black", "green"],
    required: true,
  },
  items: [{ type: String }], 
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }, // ✅ Linked to a room
});

module.exports = mongoose.model("Bin", binSchema);