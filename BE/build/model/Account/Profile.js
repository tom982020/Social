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
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const profile_contant_1 = require("../../constant/profile.contant");
const ProfileSchema = new mongoose_1.Schema({
    authors: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Author',
    },
    route: {
        type: mongoose_1.Schema.Types.String
    },
    avatar_saved: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    nickname: {
        type: mongoose_1.Schema.Types.String,
        default: null,
    },
    DOB: {
        type: mongoose_1.Schema.Types.String,
        default: null,
    },
    BIO: {
        type: mongoose_1.Schema.Types.String,
        default: null,
    },
    avatar: {
        id: mongoose_1.Schema.Types.String,
        url: mongoose_1.Schema.Types.String,
        secure_url: mongoose_1.Schema.Types.String,
        format: mongoose_1.Schema.Types.String,
        resource_type: mongoose_1.Schema.Types.String,
        created_at: mongoose_1.Schema.Types.String,
    },
    background: {
        id: mongoose_1.Schema.Types.String,
        url: mongoose_1.Schema.Types.String,
        secure_url: mongoose_1.Schema.Types.String,
        format: mongoose_1.Schema.Types.String,
        resource_type: mongoose_1.Schema.Types.String,
        created_at: mongoose_1.Schema.Types.String,
    },
    destination: {
        type: mongoose_1.Schema.Types.String,
        default: null,
    },
    rank: [
        {
            id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Profile'
            },
            star: {
                type: mongoose_1.Schema.Types.Number,
                default: 0,
            },
        },
    ],
    friend: [
        {
            id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Profile'
            },
            accept: {
                type: mongoose_1.Schema.Types.Boolean,
                default: false
            }
        }
    ],
    follow: [
        {
            id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Profile'
            },
            typeFollow: {
                type: mongoose_1.Schema.Types.String,
                default: profile_contant_1.profileContants.typeFollow.NormalPerson
            }
        }
    ],
    deleted: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'Profile',
});
ProfileSchema.plugin(mongoose_delete_1.default, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    // deleted: true
});
// paginate
ProfileSchema.plugin(mongoose_paginate_v2_1.default);
exports.default = mongoose_1.default.model('Profile', ProfileSchema);
