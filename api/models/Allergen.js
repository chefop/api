const mongoose = require("mongoose");

AllergenSchema = new mongoose.Schema({

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
  timestamp: true,
  shardKey: {
    _id: "hashed"
  }
});

AllergenSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("ALlergen", AllergenSchema);
