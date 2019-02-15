const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },

    description: {
      type: String,
      default: '',
    },

    df_price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be greater than 0.'],
    },

    vat: {
      type: Number,
      required: [true, 'Taxes are required.'],
      min: [0, 'Taxes must be greater than 0.'],
    },

    starter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Starter',
    },

    mainCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MainCourse',
    },

    Dessert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dessert',
    },
  },
  {
    timestamp: true,
    shardKey: {
      _id: 'hashed',
    },
  },
);

MenuSchema.methods.toJSON = function toJson() {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model('Menu', MenuSchema);
