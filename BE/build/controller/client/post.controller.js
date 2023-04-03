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
const Comment_1 = __importDefault(require("../../model/Comment"));
const paginate_1 = __importDefault(require("../../library/paginate"));
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
            yield Promise.all(arrayHashTags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
                const hashTagsModel = yield Hashtags_1.default.findOne({ description: tag });
                if (hashTagsModel != undefined) {
                    hashTagsModel.count += 1;
                    hashTagsModel.save();
                    yield arrayHashPost.push(hashTagsModel._id);
                }
                else {
                    const newHashTags = new Hashtags_1.default({
                        description: tag,
                        count: 1,
                    });
                    newHashTags.save();
                    // const newHashTagsModel = await HashTagsModel.findOne({ description: tag });
                    yield arrayHashPost.push(newHashTags._id);
                }
            })));
            let formData = {
                title: request.body.title,
                profile: user._id,
                description: request.body.description,
                typePost: request.body.typePost != undefined
                    ? request.body.typePost
                    : post_constant_1.postConstant.TYPEPOST.PUBLIC,
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
        else {
            let formData = {
                title: request.body.title,
                profile: user._id,
                description: request.body.description,
                typePost: request.body.typePost != undefined
                    ? request.body.typePost
                    : post_constant_1.postConstant.TYPEPOST.PUBLIC,
                image: image,
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
const commentPost = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const body = request.body;
    // const uploadResult = await handleSingleUploadFileNoLimit(request, response);
    // const uploadedFile: UploadedFile = uploadResult.file;
    try {
        const post = yield Post_1.default.findById(body.postID);
        if (post == undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: 'Post deleted' });
        }
        // const imagePost = await uploadIMage.uploadImage(uploadedFile.path);
        // let image = {
        //     id: imagePost?.public_id,
        //     url: imagePost?.url,
        //     secure_url: imagePost?.secure_url,
        //     format: imagePost?.format,
        //     resource_type: imagePost?.resource_type,
        //     created_at: imagePost?.created_at,
        // };
        // fs.unlinkSync(uploadedFile.path);
        // if(post.comment)
        let formData = {
            profile: user.profile._id,
            description: body.description,
            tagName: body.tagName,
            postID: body.postID,
            image: null,
            reactions: body.reactions,
            commentParent: body.commentParent,
        };
        const comment = new Comment_1.default(formData);
        comment
            .save()
            .then((com) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(201).json({ com });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: err });
        }));
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
const heartPost = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const body = request.body;
    const postID = request.params.postID;
    try {
        const post = yield Post_1.default.findById(postID);
        if (post == undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: 'Post deleted' });
        }
        if (post.heart.length > 0) {
            const index = yield post.heart.some((item) => item.profile.toString() === user._id.toString());
            if (index == false) {
                post.heart.push({
                    profile: user._id,
                    isHeart: true,
                });
            }
            else {
                post.heart.map((hearts) => {
                    if (hearts.profile.toString() === user._id.toString()) {
                        hearts.isHeart = body.isHeart;
                    }
                });
            }
        }
        post
            .save()
            .then((posts) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(201).json({ posts });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: err.message });
        }));
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
const getPostForUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const date = new Date(Date.now()).getTime();
        const populate = {
            select: 'route nickname avatar',
            path: 'profile hashTags',
        };
        request.query.profile = user._id;
        const result = yield (0, paginate_1.default)(request.query, Post_1.default, null, populate);
        if (result == undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: 'post deleted' });
        }
        result.docs.map((doc) => {
            const d = new Date(doc.createdAt).getTime();
            doc.createdAt = parseInt(((date - d) / 1000 / 60).toFixed(0));
        });
        yield session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
const getPostAll = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const date = new Date(Date.now()).getTime();
        const hashTag = yield Hashtags_1.default.find().sort({ count: -1 }).select('_id').limit(10);
        const arrayHashTags = hashTag.map((item) => { return item._id.toString(); });
        const populate = {
            select: 'route nickname avatar',
            path: 'profile hashTags',
        };
        request.query = {
            $or: [
                {
                    hashTags: { $in: arrayHashTags }
                },
                {
                    heart: { $ne: [] }
                },
            ]
        };
        const result = yield (0, paginate_1.default)(request.query, Post_1.default, null, populate);
        if (result == undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: 'post deleted' });
        }
        result.docs.map((doc) => {
            const d = new Date(doc.createdAt).getTime();
            doc.createdAt = parseInt(((date - d) / 1000 / 60).toFixed(0));
            if (doc.heart != undefined) {
                doc.heartCount = doc.heart.length;
            }
        });
        yield session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
const getComments = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = yield (0, paginate_1.default)(request.query, Comment_1.default, 'profile description tagName postID', {
            path: 'tagName profile',
        });
        yield session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
});
exports.default = {
    creatPost,
    commentPost,
    getPostForUser,
    getComments,
    getPostAll,
    heartPost,
};
