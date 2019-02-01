const mongoose = require("mongoose");

DessertSchema = new mongoose.Schema({

    name: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },

    df_price: {
        type: Number,
        default: 0
    },

    vat: {
        type: Number,
        default: 0
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

DessertSchema.pre("save", function(next) {
    this.updated_at = Date.now()
    next();
});

DessertSchema.methods.toJSON = function() {
    const obj = this.toObject();
    return obj;
};

module.exports = mongoose.model("Dessert", DessertSchema);
