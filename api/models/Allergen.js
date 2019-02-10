const mongoose = require('mongoose');

const AllergenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },
  },
  {
    timestamp: true,
    shardKey: {
      _id: 'hashed',
    },
  },
);

AllergenSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('ALlergen', AllergenSchema);
