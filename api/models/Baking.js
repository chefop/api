const mongoose = require("mongoose");

BakingSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true
  }

}, {
  timestamp: true,
  shardKey: {
    _id: "hashed"
  }
});

BakingSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Baking", BakingSchema);
