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
const Profile_1 = __importDefault(require("../../model/Account/Profile"));
const Author_1 = __importDefault(require("../../model/Account/Author"));
const mongoose_1 = __importDefault(require("mongoose"));
// import cloudinary from 'cloudinary';
const uploadImage_service_1 = __importDefault(require("../../service/uploadImage.service"));
const handleSingleUploadFile_1 = require("../../library/handleSingleUploadFile");
const fs_1 = __importDefault(require("fs"));
const Cipher_1 = require("../../library/Cipher");
// const Cloudinary = cloudinary.v2;
const createProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response).then().catch((err) => {
        return response
            .status(404)
            .json({ status: false, message: err.message });
    });
    const uploadedFile = uploadResult.file;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const checkUser = yield Author_1.default.findOne({
            username: request.body.username,
        }).lean();
        if (checkUser) {
            const checkProfile = yield Profile_1.default.findOne({
                authors: checkUser._id,
            });
            if (checkProfile) {
                // const data = fs.readFileSync(formData.image, 'utf8');
                const image = yield uploadImage_service_1.default.uploadAvatar(uploadedFile.path);
                let avatar = {
                    id: image === null || image === void 0 ? void 0 : image.public_id,
                    url: image === null || image === void 0 ? void 0 : image.url,
                    secure_url: image === null || image === void 0 ? void 0 : image.secure_url,
                    format: image === null || image === void 0 ? void 0 : image.format,
                    resource_type: image === null || image === void 0 ? void 0 : image.resource_type,
                    created_at: image === null || image === void 0 ? void 0 : image.created_at,
                };
                fs_1.default.unlinkSync(uploadedFile.path);
                checkProfile.avatar = avatar;
                checkProfile.nickname = request.body.nickname;
                checkProfile.DOB = request.body.DOB;
                checkProfile.BIO = request.body.BIO;
                checkProfile.destination = request.body.destination;
                yield checkProfile
                    .save({ session: session })
                    .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ pro });
                }))
                    .catch((error) => {
                    response.status(500).json({ error });
                });
            }
            else {
                let formData = {
                    nickname: request.body.nickname,
                    DOB: request.body.DOB,
                    BIO: request.body.BIO,
                    destination: request.body.destination,
                    authors: checkUser._id
                };
                fs_1.default.unlinkSync(uploadedFile.path);
                const profile = new Profile_1.default(formData);
                return profile
                    .save({ session: session })
                    .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ pro });
                }))
                    .catch((error) => {
                    response.status(500).json({ error });
                });
            }
        }
        else {
            yield session.abortTransaction();
            session.endSession();
            return response
                .status(404)
                .json({ status: false, message: 'User not found' });
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const viewProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // const user = request.body.user;
        const id = request.params.idAuthor;
        const profile = yield Profile_1.default.findOne({ authors: id }).populate({
            path: 'authors',
            select: 'name username email phone avatar',
        }).lean();
        if (profile) {
            const phone = yield (0, Cipher_1.Decreypter)(profile.authors.phone);
            profile.authors.phone = phone;
            yield session.commitTransaction();
            session.endSession();
            return response.status(200).json({ profile: profile });
        }
        else {
            yield session.abortTransaction();
            session.endSession();
            return response
                .status(400)
                .json({ status: false, message: 'Profile not found' });
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const getProfileAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const id = req.params.idAccount;
    try {
        const account = yield Author_1.default.findOne({ authors: id });
        if (account) {
            yield session.commitTransaction();
            session.endSession();
            return res.status(200).json({ account });
        }
        else {
            yield session.commitTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Account not found' });
        }
    }
    catch (err) {
        yield session.commitTransaction();
        session.endSession();
        return res.status(500).json({ message: err });
    }
});
const updateProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const id = request.params.id;
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response);
    const uploadedFile = uploadResult.file;
    try {
        const profile = yield Profile_1.default.findById(id);
        if (profile) {
            profile.nickname = request.body.nickname ? request.body.nickname : profile.nickname;
            profile.DOB = request.body.DOB ? request.body.DOB : profile.DOB;
            profile.BIO = request.body.BIO ? request.body.BIO : profile.DOB;
            const imageAvatar = yield uploadImage_service_1.default.uploadAvatar(uploadedFile.path);
            if (uploadedFile) {
                if (profile.avatar)
                    yield uploadImage_service_1.default.deleteImage(profile.avatar.id);
            }
            let avatar = {
                id: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.public_id,
                url: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.url,
                secure_url: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.secure_url,
                format: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.format,
                resource_type: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.resource_type,
                created_at: imageAvatar === null || imageAvatar === void 0 ? void 0 : imageAvatar.created_at,
            };
            profile.avatar = avatar ? avatar : profile.avatar;
            profile.destination = request.body.destination
                ? request.body.destination
                : profile.destination;
            yield profile
                .save({ session: session })
                .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.commitTransaction();
                session.endSession();
                response.status(200).json({ pro });
            }))
                .catch((error) => {
                response.status(500).json({ error });
            });
        }
        else {
            yield session.abortTransaction();
            session.endSession();
            return response
                .status(400)
                .json({ status: false, message: 'Profile not found' });
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const updateProfileBackground = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const id = request.params.id;
    try {
        const profile = yield Profile_1.default.findById(id);
        const user = request;
        if (profile) {
            yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result) {
                    if (profile.background.id != null) {
                        yield uploadImage_service_1.default.deleteImage(profile.background.id);
                    }
                }
                const image = yield uploadImage_service_1.default.uploadBackground(result.file.path);
                fs_1.default.unlinkSync(result.file.path);
                let background = {
                    id: image === null || image === void 0 ? void 0 : image.public_id,
                    url: image === null || image === void 0 ? void 0 : image.url,
                    secure_url: image === null || image === void 0 ? void 0 : image.secure_url,
                    format: image === null || image === void 0 ? void 0 : image.format,
                    resource_type: image === null || image === void 0 ? void 0 : image.resource_type,
                    created_at: image === null || image === void 0 ? void 0 : image.created_at,
                };
                profile.background = background
                    ? background
                    : profile.background;
                yield profile
                    .save({ session: session })
                    .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ pro });
                }))
                    .catch((error) => {
                    response.status(500).json({ error });
                });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                return response
                    .status(400)
                    .json({ status: false, message: err.message });
            }));
        }
        else {
            yield session.abortTransaction();
            session.endSession();
            return response
                .status(400)
                .json({ status: false, message: 'Profile not found' });
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
exports.default = {
    createProfile,
    viewProfile,
    updateProfile,
    getProfileAccount,
    updateProfileBackground,
};
