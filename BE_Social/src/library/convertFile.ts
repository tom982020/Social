import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
const outputDir = './output/';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const outputFilename = 'output.m3u8';
const outputFilePath = `${outputDir}${outputFilename}`;



export const ConvertImage = (imaPath: string) => {
    const newImage: any = ffmpeg(imaPath)
        .loop(5)
        // using 25 fps
        .fps(25)
        .on('end', () => {
            console.log('file has been converted succesfully');
        }).on('error', function (err) {
            console.log('an error happened: ' + err.message);
            console.log(' error code is : ' + err.code);
        })
        .save(outputFilePath)
    return newImage
}