const mongoose = require("mongoose");

// Define schema for widgets
const FileSchema = new mongoose.Schema({
    
    widgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "widget",
    },
    name: {
        type: String,
    },
    displayName: String,
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: String,
    size: Number,
    mimeType: String,
    desc: String,
    password: String,

})

// Create model for widgets
const File = mongoose.model("file", FileSchema);

module.exports = File;