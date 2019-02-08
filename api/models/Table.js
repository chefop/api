const mongoose = require("mongoose");

TableSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true
  },

  state: {
    type: String,
    required: [true, 'State is required.'],
    enum: ['available', 'occupied', 'payed']
  },

  capacity: {
    type: Number,
    required: [true, 'Capacity is required.'],
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

module.exports = mongoose.model("Table", TableSchema);
