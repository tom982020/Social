"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority'
}).then(() => {
    Logging_1.default.info('Connected to Mongoose');
})
    .catch((err) => Logging_1.default.error(err));
