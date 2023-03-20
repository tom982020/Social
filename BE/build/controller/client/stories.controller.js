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
const Profile_1 = __importDefault(require("../../model/Account/Profile"));
const Stories_1 = __importDefault(require("../../model/Stories"));
const uploadImage_service_1 = __importDefault(require("../../service/uploadImage.service"));
const fs_1 = __importDefault(require("fs"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const dotenv_1 = __importDefault(require("dotenv"));
const http = require('https'); // or 'https' for https:// URLs
const path = __importStar(require("path"));
dotenv_1.default.config();
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    redirectUri: 'http://localhost:8080/callback'
});
const createStoriesImage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const r = request;
    const user = r.user;
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const profile = yield Profile_1.default.findOne({ authors: user.id }).lean();
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            });
        }
        else {
            yield (0, handleSingleUploadFile_1.handleSingleUploadFileNoLimit)(request, response).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                let formData;
                const file = fs_1.default.createWriteStream("file.mp3");
                if (request.body.mp3) {
                    yield http.get(request.body.mp3, function (resp) {
                        return __awaiter(this, void 0, void 0, function* () {
                            resp.pipe(file);
                            // after download completed close filestream
                            file.on("finish", (respp) => __awaiter(this, void 0, void 0, function* () {
                                file.close();
                                // console.log("Download Completed");
                            }));
                        });
                    });
                    const dirPath = "/Users/tommy/Documents/Social/BE/";
                    let fi = file.path;
                    const filePath = path.join(dirPath, fi);
                    yield fs_1.default.access(filePath, (err) => {
                        if (err) {
                            // console.error(`does not exist in ${dirPath}`);
                            return;
                        }
                        // file exists, log its path
                        // console.log(`Path to : ${filePath}`);
                    });
                    const mp3 = yield uploadImage_service_1.default.uploadMp3(filePath);
                    fs_1.default.unlinkSync(filePath);
                    const images = yield uploadImage_service_1.default.uploadImage(result.file.path);
                    fs_1.default.unlinkSync(result.file.path);
                    const image = {
                        id: images === null || images === void 0 ? void 0 : images.public_id,
                        url: images === null || images === void 0 ? void 0 : images.url,
                        secure_url: images === null || images === void 0 ? void 0 : images.secure_url,
                        format: images === null || images === void 0 ? void 0 : images.format,
                        resource_type: images === null || images === void 0 ? void 0 : images.resource_type,
                        created_at: images === null || images === void 0 ? void 0 : images.created_at,
                    };
                    const video = {
                        id: mp3 === null || mp3 === void 0 ? void 0 : mp3.public_id,
                        url: mp3 === null || mp3 === void 0 ? void 0 : mp3.url,
                        secure_url: mp3 === null || mp3 === void 0 ? void 0 : mp3.secure_url,
                        format: mp3 === null || mp3 === void 0 ? void 0 : mp3.format,
                        resource_type: mp3 === null || mp3 === void 0 ? void 0 : mp3.resource_type,
                        created_at: mp3 === null || mp3 === void 0 ? void 0 : mp3.created_at,
                    };
                    formData = {
                        image: image,
                        video: video,
                        title: request.body.title,
                        description: request.body.description,
                        timespan: request.body.timespan,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                    };
                }
                else {
                    const images = yield uploadImage_service_1.default.uploadImageVideo(result.file.path);
                    fs_1.default.unlinkSync(result.file.path);
                    const image = {
                        id: images === null || images === void 0 ? void 0 : images.public_id,
                        url: images === null || images === void 0 ? void 0 : images.url,
                        secure_url: images === null || images === void 0 ? void 0 : images.secure_url,
                        format: images === null || images === void 0 ? void 0 : images.format,
                        resource_type: images === null || images === void 0 ? void 0 : images.resource_type,
                        created_at: images === null || images === void 0 ? void 0 : images.created_at,
                    };
                    formData = {
                        image: image,
                        // video: video,
                        title: request.body.title,
                        description: request.body.description,
                        timespan: request.body.timespan,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                    };
                }
                const stories = new Stories_1.default(formData);
                return stories
                    .save({ session: session })
                    .then((story) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ story });
                }))
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error });
                }));
            })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const createStoriesVideo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const r = request;
    const user = r.user;
    try {
        const profile = yield Profile_1.default.findOne({ authors: user.id }).lean();
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            });
        }
        else {
            yield (0, handleSingleUploadFile_1.handleSingleVideo)(request, response).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                const images = yield uploadImage_service_1.default.uploadShortVideo(result.file.path);
                fs_1.default.unlinkSync(result.file.path);
                const image = {
                    id: images === null || images === void 0 ? void 0 : images.public_id,
                    url: images === null || images === void 0 ? void 0 : images.url,
                    secure_url: images === null || images === void 0 ? void 0 : images.secure_url,
                    format: images === null || images === void 0 ? void 0 : images.format,
                    resource_type: images === null || images === void 0 ? void 0 : images.resource_type,
                    created_at: images === null || images === void 0 ? void 0 : images.created_at,
                };
                const formData = {
                    video: image,
                    title: request.body.title,
                    description: request.body.description,
                    timespan: request.body.timespan,
                    typeStories: request.body.typeStories,
                    profiles: profile._id,
                };
                const stories = new Stories_1.default(formData);
                return stories
                    .save({ session: session })
                    .then((story) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ story });
                }))
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error });
                }));
            })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const updateStoriesVideo = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const r = request;
    const user = r.user;
    const id = request.params.id;
    try {
        const profile = yield Profile_1.default.findOne({ authors: user.id }).lean();
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            });
        }
        else {
            yield (0, handleSingleUploadFile_1.handleSingleVideo)(request, response).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                yield Stories_1.default.findById(id).then((story) => __awaiter(void 0, void 0, void 0, function* () {
                    if (story == null) {
                        yield session.abortTransaction();
                        session.endSession();
                        return response.status(404).json({
                            status: false, message: 'story not found'
                        });
                    }
                    if (story.video.id) {
                        yield uploadImage_service_1.default.deleteImage(story.video.id);
                    }
                    const images = yield uploadImage_service_1.default.uploadVideo(result.file.path);
                    fs_1.default.unlinkSync(result.file.path);
                    const video = {
                        id: images === null || images === void 0 ? void 0 : images.public_id,
                        url: images === null || images === void 0 ? void 0 : images.url,
                        secure_url: images === null || images === void 0 ? void 0 : images.secure_url,
                        format: images === null || images === void 0 ? void 0 : images.format,
                        resource_type: images === null || images === void 0 ? void 0 : images.resource_type,
                        created_at: images === null || images === void 0 ? void 0 : images.created_at,
                    };
                    const formData = {
                        video: video,
                        title: request.body.title,
                        description: request.body.description,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                        currentStatus: request.body.currentStatus
                    };
                    story.set(formData)
                        .save()
                        .then((stories) => __awaiter(void 0, void 0, void 0, function* () {
                        yield session.commitTransaction();
                        session.endSession();
                        response.status(200).json({ story });
                    }))
                        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                        yield session.abortTransaction();
                        session.endSession();
                        response.status(500).json({ error });
                    }));
                })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error });
                }));
            })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const updateStoriesImage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const r = request;
    const user = r.user;
    const id = request.params.id;
    try {
        const profile = yield Profile_1.default.findOne({ authors: user.id }).lean();
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            });
        }
        else {
            yield (0, handleSingleUploadFile_1.handleSingleUploadFileNoLimit)(request, response).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                yield Stories_1.default.findById(id).then((story) => __awaiter(void 0, void 0, void 0, function* () {
                    if (story == null) {
                        yield session.abortTransaction();
                        session.endSession();
                        return response.status(404).json({
                            status: false, message: 'story not found'
                        });
                    }
                    if (story.video.id) {
                        yield uploadImage_service_1.default.deleteImage(story.video.id);
                    }
                    const images = yield uploadImage_service_1.default.uploadImage(result.file.path);
                    fs_1.default.unlinkSync(result.file.path);
                    const image = {
                        id: images === null || images === void 0 ? void 0 : images.public_id,
                        url: images === null || images === void 0 ? void 0 : images.url,
                        secure_url: images === null || images === void 0 ? void 0 : images.secure_url,
                        format: images === null || images === void 0 ? void 0 : images.format,
                        resource_type: images === null || images === void 0 ? void 0 : images.resource_type,
                        created_at: images === null || images === void 0 ? void 0 : images.created_at,
                    };
                    const formData = {
                        image: image,
                        title: request.body.title,
                        description: request.body.description,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                        currentStatus: request.body.currentStatus
                    };
                    story.set(formData)
                        .save()
                        .then((stories) => __awaiter(void 0, void 0, void 0, function* () {
                        yield session.commitTransaction();
                        session.endSession();
                        response.status(200).json({ story });
                    }))
                        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                        yield session.abortTransaction();
                        session.endSession();
                        response.status(500).json({ error });
                    }));
                })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error });
                }));
            })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const updateViewStory = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const r = request;
    const user = r.user;
    const id = request.params.id;
    try {
        const profile = yield Profile_1.default.findOne({ authors: user.id }).lean();
        if (profile == null) {
            yield session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            });
        }
        else {
            yield Stories_1.default.findById(id).then((story) => __awaiter(void 0, void 0, void 0, function* () {
                if (story == null) {
                    yield session.abortTransaction();
                    session.endSession();
                    return response.status(404).json({
                        status: false, message: 'story not found'
                    });
                }
                if (story.profiles.toString() != profile._id.toString()) {
                    let check = false;
                    yield story.views.find((element) => {
                        if (element.account.toString() === profile._id.toString()) {
                            check = true;
                            return check;
                        }
                        check = false;
                        return check;
                    });
                    if (check == false) {
                        story.views.push({
                            account: profile._id,
                            react: request.body.like
                        });
                    }
                }
                story
                    .save()
                    .then((stories) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.commitTransaction();
                    session.endSession();
                    response.status(200).json({ story });
                }))
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    yield session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error });
                }));
            })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                yield session.abortTransaction();
                session.endSession();
                response.status(500).json({ error });
            }));
        }
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
const getSpotify = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const r = request;
    const user = r.user;
    const token = r.token;
    try {
        // response.redirect(spotifyApi.createAuthorizeURL([
        //     "ugc-image-upload",
        //     "user-read-playback-state",
        //     "app-remote-control",
        //     "user-modify-playback-state",
        //     "playlist-read-private",
        //     "user-follow-modify",
        //     "playlist-read-collaborative",
        //     "user-follow-read",
        //     "user-read-currently-playing",
        //     "user-read-playback-position",
        //     "user-library-modify",
        //     "playlist-modify-private",
        //     "playlist-modify-public",
        //     "user-read-email",
        //     "user-top-read",
        //     "streaming"
        // ]))
        spotifyApi.setAccessToken(token);
        const j = spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
            .then(function (data) {
            console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
        return response.status(200).json({ user });
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
});
exports.default = {
    createStoriesImage,
    createStoriesVideo,
    updateStoriesVideo,
    updateViewStory,
    updateStoriesImage,
    getSpotify
};
