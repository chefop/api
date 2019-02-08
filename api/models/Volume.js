const mongoose = require("mongoose");

VolumeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }

}, {
  shardKey: {
    _id: "hashed"
  }
});

VolumeSchema.pre("save", function(next) {
  this.updated_at = Date.now()
  next();
});

VolumeSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Volume", VolumeSchema);
