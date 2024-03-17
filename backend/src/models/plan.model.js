const mongoose = require("mongoose");

// Define schema for plan
const PlanSchema = new mongoose.Schema({
    
    name: {
        type: String,
        enum: ['free', 'pro'],
        required: true
    },
    allowedWidgets: {
        type: [{
            type: String,
            enum: ["label", "threadsFeeds", "form", "appfolio", "files"]
        }],
    },
    price: Number,
    desc: String,
    duration: Number,
    widgetCount: Number,
    stripeProductId: String
})

// Create model for widgets
const Plan = mongoose.model("plan", PlanSchema);

module.exports = Plan;