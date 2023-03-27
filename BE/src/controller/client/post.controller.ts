/** @format */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { UploadedFile } from '../../interface/upload/image';
import {
    handleSingleUploadFile,
    handleSingleUploadFileNoLimit,
} from '../../library/handleSingleUploadFile';
import PostModel from '../../model/Post';
import uploadIMage from '../../service/uploadImage.service';
import HashTagsModel from '../../model/Hashtags';
import fs from 'fs';
import { IHashtags } from '../../interface/Schema/IHashtags';
import { postConstant } from '../../constant/post.constant';
import { IComment } from '../../interface/Schema/IPost';
const creatPost = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    const uploadResult = await handleSingleUploadFileNoLimit(request, response);
    const uploadedFile: UploadedFile = uploadResult.file;
    try {
        const imagePost = await uploadIMage.uploadImage(uploadedFile.path);
        let image = {
            id: imagePost?.public_id,
            url: imagePost?.url,
            secure_url: imagePost?.secure_url,
            format: imagePost?.format,
            resource_type: imagePost?.resource_type,
            created_at: imagePost?.created_at,
        };

        fs.unlinkSync(uploadedFile.path);

        if (request.body.hashTags !== undefined) {
            const arrayHashTags = request.body.hashTags;
            const arrayHashPost: any = [];
            arrayHashTags.map(async (tag: string) => {
                const hashTagsModel = await HashTagsModel.findOne({ description: tag });
                if (hashTagsModel != undefined) {
                    hashTagsModel.count += 1;
                    hashTagsModel.save();
                    arrayHashPost.push(hashTagsModel._id);
                } else {
                    const newHashTags = new HashTagsModel({
                        description: tag,
                        count: 1,
                    });
                    newHashTags.save();
                    const findNewHashtags = await HashTagsModel.findOne({
                        description: tag,
                    });
                    if (findNewHashtags != undefined) {
                        arrayHashPost.push(findNewHashtags._id);
                    }
                }
            });
            let formData = {
                title: request.body.title,
                profile: user.profile._id,
                description: request.body.description,
                typePost:
                    request.body.typePost != undefined
                        ? request.body.typePost
                        : postConstant.TYPEPOST.PUBLIC,
                image: image,
                hashTags: arrayHashPost,
            };

            const post = new PostModel(formData);
            return post
                .save()
                .then(async (posts) => {
                    await session.commitTransaction();
                    session.endSession();
                    response.status(201).json({ posts });
                })
                .catch((error) => {
                    response.status(500).json({ error });
                });
        } else {
            let formData = {
                title: request.body.title,
                profile: user.profile._id,
                description: request.body.description,
                typePost:
                    request.body.typePost != undefined
                        ? request.body.typePost
                        : postConstant.TYPEPOST.PUBLIC,
                image: image,
            };

            const post = new PostModel(formData);
            return post
                .save()
                .then(async (posts) => {
                    await session.commitTransaction();
                    session.endSession();
                    response.status(201).json({ posts });
                })
                .catch((error) => {
                    response.status(500).json({ error });
                });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const commentPost = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    // const uploadResult = await handleSingleUploadFileNoLimit(request, response);
    // const uploadedFile: UploadedFile = uploadResult.file;
    try {
        const post = await PostModel.findById(request.body.idPost);
        if (post == undefined) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: 'Post deleted' });
        }
        if (request.body.comment) {
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
            await post.comment.push({
                profile: user.profile._id,
                description: request.body.comment.description,
                tagName: request.body.comment.tagName,
                reactions: request.body.comment.reactions != undefined ? request.body.comment.reactions : null,
                image: null,
            });
            post
                .save()
                .then(async (posts) => {
                    await session.commitTransaction();
                    session.endSession();
                    response.status(201).json({ posts });
                })
                .catch((error) => {
                    response.status(500).json({ error });
                });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const getPostForUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const post = await PostModel.find(
            {
                profile: user.profile._id
            }
        ).populate({
            select: 'route nickname avatar',
            path: 'profile hashTags comment.profile comment.tagName'
        }).lean()
        if (post == undefined) {
            await session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: 'post deleted' });
        }

        await session.commitTransaction();
        session.endSession();
        return response.status(200).json({ post });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
}

export default {
    creatPost,
    commentPost,
    getPostForUser
};
