const mongoose = require("mongoose");

VolumeSchema = new mongoose.Schema({

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

VolumeSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Volume", VolumeSchema);
