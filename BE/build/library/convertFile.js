"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertImage = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const outputDir = './output/';
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
const outputFilename = 'output.m3u8';
const outputFilePath = `${outputDir}${outputFilename}`;
const ConvertImage = (imaPath) => {
    const newImage = (0, fluent_ffmpeg_1.default)(imaPath)
        .loop(5)
        // using 25 fps
        .fps(25)
        .on('end', () => {
        console.log('file has been converted succesfully');
    }).on('error', function (err) {
        console.log('an error happened: ' + err.message);
        console.log(' error code is : ' + err.code);
    })
        .save(outputFilePath);
    return newImage;
};
exports.ConvertImage = ConvertImage;
