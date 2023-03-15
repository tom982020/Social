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
const fs_1 = __importDefault(require("fs"));
// const Cloudinary = cloudinary.v2;
const createProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = request.body;
    const file = request.file;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const checkUser = yield Author_1.default.findOne({
            username: formData.username,
        }).lean();
        if (checkUser) {
            const checkProfile = yield Profile_1.default.findOne({
                authors: checkUser._id,
            });
            if (checkProfile) {
                const data = fs_1.default.readFileSync(formData.image, 'utf8');
                const image = uploadImage_service_1.default === null || uploadImage_service_1.default === void 0 ? void 0 : uploadImage_service_1.default.uploadImage(data);
                // 	let avatar = {
                // 		id: images.public_id,
                // url: images.url
                // secure_url: image.secure_url,
                // format: image.format,
                // resource_type: image.resourresource_type,
                // created_at: image.created_at,
                // 	}
                // })
                console.log(image);
                return;
                // checkProfile.avatar = image
                // checkProfile.nickname = formData.nickname;
                // checkProfile.DOB = formData.DOB;
                // checkProfile.BIO = formData.BIO;
                // checkProfile.destination = formData.destination;
                // await checkProfile
                // 	.save({ session: session })
                // 	.then(async (pro) => {
                // 		await session.commitTransaction();
                // 		session.endSession();
                // 		response.status(200).json({ pro });
                // 	})
                // 	.catch((error) => {
                // 		response.status(500).json({ error });
                // 	});
            }
            else {
                formData.authors = checkUser._id;
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
        const user = request.body.user;
        const id = request.params.idAuthor;
        const profile = yield Profile_1.default.findOne({ authors: id }).populate({
            path: 'authors',
            select: 'name username email phone',
        });
        if (profile) {
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
    const formData = request.body;
    try {
        const profile = yield Profile_1.default.findById(id);
        if (profile) {
            profile.nickname = formData.nickname;
            profile.DOB = formData.DOB;
            profile.BIO = formData.BIO;
            profile.avatar = formData.avatar ? formData.avatar : profile.avatar;
            profile.background = formData.background
                ? formData.background
                : profile.background;
            profile.destination = formData.destination
                ? formData.destination
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
exports.default = {
    createProfile,
    viewProfile,
    updateProfile,
    getProfileAccount,
};
