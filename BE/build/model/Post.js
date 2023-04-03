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
const post_constant_1 = require("../constant/post.constant");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        require: true,
    },
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    heart: [
        {
            profile: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Profile',
            },
            isHeart: {
                type: mongoose_1.Schema.Types.Boolean,
                default: false,
            }
        }
    ],
    description: {
        type: mongoose_1.Schema.Types.String,
    },
    typePost: {
        type: mongoose_1.Schema.Types.String,
        default: post_constant_1.postConstant.TYPEPOST.PUBLIC,
        require: true,
    },
    image: {
        id: mongoose_1.Schema.Types.String,
        url: mongoose_1.Schema.Types.String,
        secure_url: mongoose_1.Schema.Types.String,
        format: mongoose_1.Schema.Types.String,
        resource_type: mongoose_1.Schema.Types.String,
        created_at: mongoose_1.Schema.Types.String,
    },
    imageArray: [
        {
            id: mongoose_1.Schema.Types.String,
            url: mongoose_1.Schema.Types.String,
            secure_url: mongoose_1.Schema.Types.String,
            format: mongoose_1.Schema.Types.String,
            resource_type: mongoose_1.Schema.Types.String,
            created_at: mongoose_1.Schema.Types.String,
        }
    ],
    video: {
        id: mongoose_1.Schema.Types.String,
        url: mongoose_1.Schema.Types.String,
        secure_url: mongoose_1.Schema.Types.String,
        format: mongoose_1.Schema.Types.String,
        resource_type: mongoose_1.Schema.Types.String,
        created_at: mongoose_1.Schema.Types.String,
    },
    hashTags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Hashtags'
        }
    ],
    share: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true,
    collection: 'Post',
});
PostSchema.plugin(mongoose_delete_1.default, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
});
// paginate
PostSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Post = mongoose_1.default.model('Post', PostSchema);
exports.default = Post;
