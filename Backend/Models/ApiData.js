const mongoose = require("mongoose");

const ApiDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    apiKey: {
        type: String,
        unique: true,
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ['Free', 'Paid'],
        default: 'Free'
    },
    subscriptionStartDate: {
        type: Date,
        default: Date.now
    },
    subscriptionEndDate: {
        type: Date,
        default: Date.now
    },
    activationstatus: {
        type: Boolean,
        default: false
    },
    apicallCount: {
        type: Number,
        default: 0
    },
    limit: {
        type: Number,
        default: 50
    },
    lastCalled: {
        type: Date,
        default: Date.now
    }
});

const ApiData = mongoose.model("ApiData", ApiDataSchema);
module.exports = ApiData;
