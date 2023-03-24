"use strict";
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
exports.handleAvatar = void 0;
const Profile_1 = __importDefault(require("../model/Account/Profile"));
const uploadImage_service_1 = __importDefault(require("../service/uploadImage.service"));
const handleAvatar = () => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield Profile_1.default.find({
        avatar_saved: false
    });
    profile.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let profileChild = yield Profile_1.default.findById(item._id);
        if (((_a = profileChild === null || profileChild === void 0 ? void 0 : profileChild.avatar) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
            yield uploadImage_service_1.default.deleteImage((_b = profileChild === null || profileChild === void 0 ? void 0 : profileChild.avatar) === null || _b === void 0 ? void 0 : _b.id);
        }
        profileChild.avatar = {};
        profileChild.save();
    }));
});
exports.handleAvatar = handleAvatar;
