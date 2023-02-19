"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tripApplicationSchema = new mongoose_1.Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'REJECTED', 'CANCELLED', 'ACCEPTED', 'DUE']
    },
    comments: {
        type: String,
        required: true,
    },
    denied: {
        type: Boolean,
        required: false
    },
    reason: {
        type: String,
        required: false
    },
    isPaid: {
        type: Boolean,
        require: false
    }
});
exports.default = (0, mongoose_1.model)('Trip_Application', tripApplicationSchema);
