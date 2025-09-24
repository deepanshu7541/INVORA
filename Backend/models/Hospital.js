const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hosp_name: { type: String, required: true },                  // "Central Hospital"
  address: { type: String, required: true },               // "123 Main St"
  phone: { type: String },                                 // "(212) 555-1234"
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], // Related rooms
  dateCreated: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Hospital", hospitalSchema);

// const mongoose = require("mongoose");

// const hospitalSchema = new mongoose.Schema({
//   hosp_name: { type: String, required: true },
//   address: { type: String, required: true },
//   dateCreated: { type: Date, default: Date.now },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// module.exports = mongoose.model("Hospital", hospitalSchema);