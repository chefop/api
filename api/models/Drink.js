const mongoose = require("mongoose");

DrinksSchema = new mongoose.Schema({

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
        required: [true, 'Price is required.']
    },

    vat: {
        type: Number,
        required: [true, 'Taxes are required.']
    },

    quantity: {
        type: Number,
        default: 0
    },

    allergen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Allergen"
    },

    photo: {
        type: String,
        default: ''
    },

    volume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volume"
    },

    alcohol: {
        type: Boolean,
        required: [true, 'Alcohol is required.']
    },

    cold_drink: {
        type: Boolean,
        required: [true, 'Cold drink is required.']
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

DrinksSchema.pre("save", function(next) {
    this.updated_at = Date.now()
    next();
});

DrinksSchema.methods.toJSON = function() {
    const obj = this.toObject();
    return obj;
};

module.exports = mongoose.model("Drinks", DrinksSchema);
