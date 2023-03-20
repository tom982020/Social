"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config/config");
dotenv_1.default.config();
const uploadAvatar = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'image',
        transformation: [
            { width: 500, height: 500, gravity: "faces", crop: "thumb" }
        ],
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadBackground = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'image',
        transformation: [
            { effect: "trim:20" }
        ],
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadImage = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'image',
        effect: "improve"
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadImageVideo = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'image',
        crop: "scale",
        audio_codec: "none",
        effect: "boomerang", duration: "8",
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadVideo = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'video',
        crop: "scale",
        end_offset: "60",
        audio_codec: "none",
        eager_async: true
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadShortVideo = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'video',
        crop: "scale",
        end_offset: "4",
        audio_codec: "none",
        effect: "boomerang", duration: "4",
        eager_async: true
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const uploadMp3 = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .upload(imagePath, {
        resource_type: 'video'
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.uploader
        .destroy(publicId, {})
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
const deleteVideo = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    let res = [];
    cloudinary_1.v2.config({
        cloud_name: config_1.config.CLOUD_NAME,
        api_key: config_1.config.API_KEY,
        api_secret: config_1.config.API_SECRET,
        secure: true,
    });
    yield cloudinary_1.v2.api.delete_resources_by_prefix(publicId)
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.push(result);
    }));
    return res[0];
});
exports.default = {
    uploadAvatar,
    uploadBackground,
    deleteImage,
    uploadImage,
    uploadShortVideo,
    uploadVideo,
    deleteVideo,
    uploadMp3,
    uploadImageVideo
};
