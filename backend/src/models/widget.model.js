const mongoose = require("mongoose");
require("dotenv").config()

// Define schema for widgets
const WidgetSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    widgetType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
    },
    plan: {
        type: String,
        enum: ["free", "pro"]
    },
    publish: {
        type: Boolean,
        required: true
    },
    activated: Boolean,
    subscriptionId: String,
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment"
    }],
    password: String,
    htmlData: {
        label: {
            text: {
                type: String,
                required: function() {
                    return this.category === 'label';
                }
            },
            textColor: String,
            fontFamily: String,
            fontSize: Number,
        },
        appfolio: {
            height: Number,
            width: Number,
            appfolioUrl: {
                type: String,
                required: function() {
                    return this.category === 'appfolio';
                }
            },
            appfolioHeading: String,
            appfolioTemplate: String,
            appfolioDisplayFilters: {
                search: Boolean,
                cats: Boolean,
                dogs: Boolean,
                minRent: Boolean,
                maxRent: Boolean,
                beds: Boolean,
                baths: Boolean,
                cities: Boolean,
                zip: Boolean,
                desiredMoveIn: Boolean,
                sorting: Boolean,
            },
            appfolioSortOrder: String,
            searchBtnText: String,
            searchBtnBg: String,
            appfolioCol: Number,
            appfolioRentText: String,
            displayBeds: Boolean,
            bedImgUrl: String,
            displayBath: Boolean,
            bathImgUrl: String,
            priceTagImgUrl: String,
            phoneImgUrl: String,
            checkImgUrl: String,
            appfolioRentText: String,
            template: {
                type: String,
                enum: ["hawk", "eagle"],
            },
            clientGmapApi: String,
        },
        threadsFeeds: {
            height: Number,
            width: Number,
            backgroundColor: String,
            textColor: String,
            fontFamily: String,
            fontSize: String,
            threadsId: Number,
            threadsUrl: {
                type: String,
                required: function() {
                    return this.category === 'threadsFeeds';
                }
            },
            displayTimeElapsed: Boolean,
            displayLikeBtn: Boolean,
            displayCommentBtn: Boolean,
            displayRepostBtn: Boolean,
            displayShareBtn: Boolean,
            displayReactions: Boolean,
            displayThreadLogo: Boolean,
            displayMedia: Boolean,
            noOfThreads: Number,
            template: {
                type: String,
                enum: ["list", "grid", "slider"],
            },
        },
        files: {
            docs: {
                type: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'File'
                }]
            },
            preview: {
                type: String,
                enum: ['download', 'nextTab', 'currentTab']
            },
        }
    }

});

// Create model for widgets
const Widget = mongoose.model("widget", WidgetSchema);

module.exports = Widget;