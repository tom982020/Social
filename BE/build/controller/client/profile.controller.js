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
const moment_1 = __importDefault(require("moment"));
const paginate_1 = __importDefault(require("../../library/paginate"));
const Friend_1 = __importDefault(require("../../model/Account/Friend"));
// const Cloudinary = cloudinary.v2;
const createProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const r = request;
    const user = r.user;
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response)
        .then()
        .catch((err) => {
        return response.status(404).json({ status: false, message: err.message });
    });
    const uploadedFile = uploadResult.file;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const checkUser = yield Author_1.default.findOne({
            username: user.username,
        });
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
                if ((checkProfile === null || checkProfile === void 0 ? void 0 : checkProfile.avatar.id) != undefined) {
                    yield uploadImage_service_1.default.deleteImage((_a = checkProfile.avatar) === null || _a === void 0 ? void 0 : _a.id);
                }
                checkProfile.avatar = avatar;
                yield checkProfile
                    .save({ session: session })
                    .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(201).json({ pro });
                }))
                    .catch((error) => {
                    response.status(500).json({ error });
                });
            }
            else {
                const ExistName = yield Profile_1.default.find({
                    nickname: request.body.nickname,
                }).lean();
                if (ExistName.length > 0) {
                    yield session.abortTransaction();
                    session.endSession();
                    return response
                        .status(404)
                        .json({ status: false, message: 'Nick name is exist' });
                }
                const randomNumber = Math.floor(Math.random() * 1000) + 1;
                const getDOB = (0, moment_1.default)(new Date(request.body.DOB))
                    .format('DD/MM/YYYY')
                    .toString();
                let formData = {
                    nickname: request.body.nickname,
                    route: request.body.nickname.replace(' ', '-') +
                        getDOB.split('/')[0] +
                        randomNumber,
                    DOB: (0, moment_1.default)(new Date(request.body.DOB))
                        .format('DD/MM/YYYY')
                        .toString(),
                    BIO: request.body.BIO,
                    destination: request.body.destination,
                    authors: checkUser._id,
                };
                // fs.unlinkSync(uploadedFile.path)
                const profile = new Profile_1.default(formData);
                checkUser.exist_Profile = true;
                checkUser.save();
                return profile
                    .save({ session: session })
                    .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(201).json({ pro, checkUser });
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
    const route = yield request.params.routeProfile;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findOne({
            $and: [
                {
                    route: route,
                },
                {
                    deleted: false,
                },
            ],
        })
            .populate({
            path: 'authors',
            select: 'name username email phone avatar',
        })
            .lean();
        if (profile) {
            const phone = yield (0, Cipher_1.Decrypter)(profile.authors.phone);
            let star = 0;
            let temp = {};
            profile.authors.phone = phone;
            yield profile.rank.map((item) => {
                star = star + item.star;
                return star;
            });
            temp.id = profile._id;
            temp.authors = profile.authors;
            temp.nickname = profile.nickname;
            temp.DOB = profile.DOB;
            temp.BIO = profile.BIO;
            temp.avatar = profile.avatar;
            temp.destination = profile.destination;
            temp.follow = profile.follow;
            temp.route = profile.route;
            temp.rank = star / profile.rank.length;
            temp.evaluate = profile.rank.length;
            temp.followNumber = profile.follow.length;
            yield session.commitTransaction();
            session.endSession();
            return response.status(200).json({ profile: temp });
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
        const account = yield Author_1.default.findById(id);
        const profile = yield Profile_1.default.findOne({
            authors: id,
        }).populate({
            path: 'authors',
        });
        if (account) {
            let pho;
            pho = yield (0, Cipher_1.Decrypter)(account.phone);
            do {
                pho = yield (0, Cipher_1.Decrypter)(account.phone);
            } while (pho == undefined);
            account.phone = pho;
            yield session.commitTransaction();
            session.endSession();
            return res.status(200).json({ account, profile });
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
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const id = request.params.id;
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response);
    const uploadedFile = uploadResult.file;
    try {
        const profile = yield Profile_1.default.findById(id);
        if (profile) {
            profile.nickname = request.body.nickname
                ? request.body.nickname
                : profile.nickname;
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
            fs_1.default.unlinkSync(uploadedFile.path);
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
    const uploadResult = yield (0, handleSingleUploadFile_1.handleSingleUploadFile)(request, response)
        .then()
        .catch((err) => {
        return response.status(404).json({ status: false, message: err.message });
    });
    const uploadedFile = uploadResult.file;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const id = request.params.id;
    try {
        const profile = yield Profile_1.default.findById(id);
        if (profile) {
            if (profile.background.id != undefined) {
                yield uploadImage_service_1.default.deleteImage(profile.background.id);
            }
            const image = yield uploadImage_service_1.default.uploadBackground(uploadedFile.path);
            fs_1.default.unlinkSync(uploadedFile.path);
            let background = {
                id: image === null || image === void 0 ? void 0 : image.public_id,
                url: image === null || image === void 0 ? void 0 : image.url,
                secure_url: image === null || image === void 0 ? void 0 : image.secure_url,
                format: image === null || image === void 0 ? void 0 : image.format,
                resource_type: image === null || image === void 0 ? void 0 : image.resource_type,
                created_at: image === null || image === void 0 ? void 0 : image.created_at,
            };
            profile.background = background ? background : profile.background;
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
const addFriendProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.body.idProfile;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findById(id);
        const profileMe = yield Profile_1.default.findOne({ authors: user.authors._id });
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Profile not found');
        }
        if (profileMe == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Create profile before add friend');
        }
        const friend = yield Friend_1.default.findOne({
            $and: [
                {
                    idProfile: profileMe._id,
                },
                {
                    idFriend: profile._id,
                },
            ],
        });
        if (friend != undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response
                .status(400)
                .json('You should to wait he/she accept friend');
        }
        let formData = {
            idProfile: profileMe._id,
            idFriend: profile._id,
        };
        const newFriend = new Friend_1.default(formData);
        newFriend
            .save()
            .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(200).json({ pro });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: err });
        }));
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const acceptFriendProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.body.idProfile;
    const accept = request.body.accept;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findById(id);
        const profileMe = yield Profile_1.default.findOne({ authors: user.authors._id });
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Profile not found');
        }
        if (profileMe == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Create profile before add friend');
        }
        const friend = yield Friend_1.default.findOne({
            $and: [
                {
                    idProfile: profileMe._id,
                },
                {
                    idFriend: profile._id,
                },
            ],
        });
        if (friend == undefined) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Dont decline friend');
        }
        if (accept == false) {
            friend.deleted = true;
            friend
                .save()
                .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.commitTransaction();
                session.endSession();
                response.status(200).json({ pro });
            }))
                .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                return response.status(500).json({ error: err });
            }));
        }
        else {
            friend.accept = true;
            friend
                .save()
                .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.commitTransaction();
                session.endSession();
                response.status(200).json({ pro });
            }))
                .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                return response.status(500).json({ error: err });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const rankProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.body.idProfile;
    const star = request.body.star;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findById(id);
        const profileMe = yield Profile_1.default.findOne({ authors: user.id });
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Profile not found');
        }
        if (profileMe == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Create profile before add friend');
        }
        let check = false;
        yield profileMe.rank.find((element) => {
            if (element.id.toString() === profile._id.toString()) {
                check = true;
                element.star = star;
                return check;
            }
            check = false;
            return check;
        });
        if (check == false) {
            profileMe.rank.push({
                id: profile._id,
                star: star,
            });
        }
        profileMe
            .save()
            .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(200).json({ pro });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: err });
        }));
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const followProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.body.idProfile;
    const typeFollow = request.body.star;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findById(id);
        const profileMe = yield Profile_1.default.findOne({ authors: user.id });
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Profile not found');
        }
        if (profileMe == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Create profile before add friend');
        }
        let check = false;
        yield profileMe.follow.find((element) => {
            if (element.id.toString() === id) {
                check = true;
                return check;
            }
            check = false;
            return check;
        });
        if (check == false) {
            profileMe.follow.push({
                id: profile._id,
                typeFollow: typeFollow,
            });
        }
        else {
            yield profileMe.follow.map((element, index) => {
                if (element.id.toString() === id) {
                    profileMe.follow.splice(index, 1);
                    return;
                }
            });
        }
        profileMe
            .save()
            .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(200).json({ pro });
        }))
            .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: err });
        }));
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const updateAvatarSave = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.params.idProfile;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findById(id);
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(400).json('Profile not found');
        }
        profile.avatar_saved = true;
        profile
            .save()
            .then((pro) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.commitTransaction();
            session.endSession();
            response.status(201).json({ pro });
        }))
            .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            yield session.abortTransaction();
            session.endSession();
            return response.status(500).json(error);
        }));
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const getFriendProfile = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    const id = request.params.idProfile;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const populate = {
            path: 'idFriend',
        };
        // request.query.idFriend = id;
        request.query.idProfile = id;
        request.query.accept = 'true';
        request.query.deleted = 'false';
        // request.query.friend = [
        // 	{
        // 		accept: { $ne: 'true' }
        // 	}
        // ]
        const result = yield (0, paginate_1.default)(request.query, Friend_1.default, null, populate);
        yield session.commitTransaction();
        session.endSession();
        response.status(200).json({ result });
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
    addFriendProfile,
    acceptFriendProfile,
    rankProfile,
    followProfile,
    updateAvatarSave,
    getFriendProfile,
};
