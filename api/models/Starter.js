const mongoose = require("mongoose");

StarterSchema = new mongoose.Schema({

  name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true
  },

  description: {
      type: String,
      default: ''
  },

  df_price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be greater than 0.']
  },

  vat: {
      type: Number,
      required: [true, 'Taxes are required.'],
      min: [0, 'Taxes must be greater than 0.']
  },

  quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity must be greater than 0.']
  },

  allergen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Allergen"
  },

  photo: {
      type: String,
      default: ''
  }

}, {
  timestamp: true,
  shardKey: {
      _id: "hashed"
  }
});

StarterSchema.methods.toJSON = function() {
    const obj = this.toObject();
    return obj;
};

module.exports = mongoose.model("Starter", StarterSchema);
