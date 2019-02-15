const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },

    state: {
      type: String,
      required: [true, 'State is required.'],
      enum: ['available', 'occupied', 'payed'],
    },

    capacity: {
      type: Number,
      required: [true, 'Capacity is required.'],
      min: [0, 'Capacity must be greater than 0.'],
    },
  },
  {
    timestamp: true,
    shardKey: {
      _id: 'hashed',
    },
  },
);

TableSchema.methods.toJSON = function toJson() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('Table', TableSchema);
