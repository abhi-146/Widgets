const mongoose = require("mongoose");
require("dotenv").config()

// Define schema for widget type
const WidgetCategorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["feeds", "files", "listings"]
    },
    price: Number,
    desc: String,
    stripePriceId: String,
    stripeProductId: String

});

// Create model for widgets
const WidgetCategory = mongoose.model("widgetType", WidgetCategorySchema);

module.exports = WidgetCategory;