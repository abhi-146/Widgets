const mongoose = require("mongoose");

// Define schema for payment
const PaymentSchema = new mongoose.Schema({
    
    widgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "widget"
    },
    invoiceId: {
        type: String,
        required: true
    },
    created: Number, // in ms
    amount: Number,
})

// Create model for widgets
const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;