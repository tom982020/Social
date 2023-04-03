"use strict";
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
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const CommentSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    description: {
        type: mongoose_1.Schema.Types.String,
    },
    tagName: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Profile',
        }
    ],
    postID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post'
    },
    image: {
        id: mongoose_1.Schema.Types.String,
        url: mongoose_1.Schema.Types.String,
        secure_url: mongoose_1.Schema.Types.String,
        format: mongoose_1.Schema.Types.String,
        resource_type: mongoose_1.Schema.Types.String,
        created_at: mongoose_1.Schema.Types.String,
    },
    reactions: {
        type: mongoose_1.Schema.Types.String,
    },
    commentParent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {
    timestamps: true,
    collection: 'Comment',
});
CommentSchema.plugin(mongoose_delete_1.default, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
});
// paginate
CommentSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Comment = mongoose_1.default.model('Comment', CommentSchema);
exports.default = Comment;
