"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const Mongoose = require("mongoose");
const logging_1 = require("./plugins/logging/logging");
function init(config) {
    Mongoose.Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString);
    let mongoDb = Mongoose.connection;
    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });
    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });
    return {
        loggingModel: logging_1.LoggingModel,
        //     taskModel: TaskModel,
        //     userModel: UserModel
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map