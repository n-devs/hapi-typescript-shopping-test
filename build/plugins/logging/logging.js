"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingModel = exports.LoggingSchema = void 0;
const Mongoose = require("mongoose");
exports.LoggingSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    payload: { type: String, required: true },
    response: { type: String, required: true }
}, {
    timestamps: true
});
exports.LoggingModel = Mongoose.model("logging", exports.LoggingSchema);
//# sourceMappingURL=logging.js.map