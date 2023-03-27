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
const mongoose_1 = __importDefault(require("mongoose"));
const handleSingleUploadFile_1 = require("../../library/handleSingleUploadFile");
const Post_1 = __importDefault(require("../../model/Post"));
const uploadImage_service_1 = __importDefault(require("../../service/uploadImage.service"));
const Hashtags_1 = __importDefault(require("../../model/Hashtags"));
const fs_1 = __importDefault(require("fs"));
const post_constant_1 = require("../../constant/post.constant");
const creatPost = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFileNoLimit)(request, response);
    const uploadedFile = uploadResult.file;
    try {
        const imagePost = yield uploadImage_service_1.default.uploadImage(uploadedFile.path);
        let image = {
            id: imagePost === null || imagePost === void 0 ? void 0 : imagePost.public_id,
            url: imagePost === null || imagePost === void 0 ? void 0 : imagePost.url,
            secure_url: imagePost === null || imagePost === void 0 ? void 0 : imagePost.secure_url,
            format: imagePost === null || imagePost === void 0 ? void 0 : imagePost.format,
            resource_type: imagePost === null || imagePost === void 0 ? void 0 : imagePost.resource_type,
            created_at: imagePost === null || imagePost === void 0 ? void 0 : imagePost.created_at,
        };
        fs_1.default.unlinkSync(uploadedFile.path);
        if (request.body.hashTags !== undefined) {
            const arrayHashTags = request.body.hashTags;
            const arrayHashPost = [];
            arrayHashTags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
                const hashTagsModel = yield Hashtags_1.default.findOne({ description: tag });
                if (hashTagsModel != undefined) {
                    hashTagsModel.count += 1;
                    hashTagsModel.save();
                    arrayHashPost.push(hashTagsModel._id);
                }
                else {
                    const newHashTags = new Hashtags_1.default({
                        description: tag,
                        count: 1,
                    });
                    newHashTags.save();
                    const findNewHashtags = yield Hashtags_1.default.findOne({
                        description: tag,
                    });
                    if (findNewHashtags != undefined) {
                        arrayHashPost.push(findNewHashtags._id);
                    }
                }
            }));
            let formData = {
                title: request.body.title,
                profile: request.body.profile,
                description: request.body.description,
                typePost: request.body.typePost != undefined ? request.body.typePost : post_constant_1.postConstant.TYPEPOST.PUBLIC,
                image: image,
                hashTags: arrayHashPost,
            };
            const post = new Post_1.default(formData);
            return post
                .save()
                .then((posts) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.commitTransaction();
                session.endSession();
                response.status(201).json({ posts });
            }))
                .catch((error) => {
                response.status(500).json({ error });
            });
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
exports.default = {
    creatPost
};
