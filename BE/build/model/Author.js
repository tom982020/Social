"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongooseDelete = require('mongoose-delete');
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const author_constant_1 = require("../constant/author.constant");
const AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hasPassword: String,
    access_token: String,
    refresh_token: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    type: {
        type: mongoose_1.Schema.Types.Number,
        default: author_constant_1.authorConstants.typeUsers.User,
    },
}, {
    timestamps: true,
    collection: 'Author',
});
AuthorSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    // deleted: true
});
// paginate
AuthorSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = mongoose_1.default.model('Author', AuthorSchema);
