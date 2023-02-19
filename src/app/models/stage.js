"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stage = new mongoose_1.Schema({
    title: {
        type: String,
        require: false,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }
});
exports.default = (0, mongoose_1.model)("Stage", stage);
