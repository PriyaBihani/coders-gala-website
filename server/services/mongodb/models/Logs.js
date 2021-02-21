var mongoose = require("mongoose");

var logSchema = new mongoose.Schema({
  type: { type: String, default: null },
  metadata: { type: Object, default: null },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
