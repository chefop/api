const mongoose = require('mongoose');

const VolumeSchema = new mongoose.Schema(
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

VolumeSchema.methods.toJSON = function toJson() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('Volume', VolumeSchema);
