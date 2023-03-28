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
import CommentModel from '../../model/Comment';
import paginateHandler from '../../library/paginate';
import { IHeart, IPost } from '../../interface/Schema/IPost';
import moment from 'moment';
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
            await Promise.all(arrayHashTags.map(async (tag: string) => {
                const hashTagsModel = await HashTagsModel.findOne({ description: tag });
                if (hashTagsModel != undefined) {
                    hashTagsModel.count += 1;
                    hashTagsModel.save()
                    await arrayHashPost.push(hashTagsModel._id);
                } else {
                    const newHashTags = new HashTagsModel({
                        description: tag,
                        count: 1,
                    });
                    newHashTags.save()
                    // const newHashTagsModel = await HashTagsModel.findOne({ description: tag });
                    await arrayHashPost.push(newHashTags._id);
                }
            }));
            let formData = {
                title: request.body.title,
                profile: user._id,
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
                profile: user._id,
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
    const body = request.body;
    // const uploadResult = await handleSingleUploadFileNoLimit(request, response);
    // const uploadedFile: UploadedFile = uploadResult.file;
    try {
        const post = await PostModel.findById(body.postID);
        if (post == undefined) {
            await session.abortTransaction();
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
        const comment = new CommentModel(formData);
        comment
            .save()
            .then(async (com) => {
                await session.commitTransaction();
                session.endSession();
                response.status(201).json({ com });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                session.endSession();
                return response.status(404).json({ error: err });
            });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const heartPost = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    const body = request.body;
    const postID = request.params.postID;
    try {
        const post = await PostModel.findById(postID);
        if (post == undefined) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({ error: 'Post deleted' });
        }
        if (post.heart.length > 0) {
            const index = await post.heart.some(
                (item: IHeart) => item.profile.toString() === user._id.toString()
            );
            if (index == false) {
                post.heart.push({
                    profile: user._id,
                    isHeart: true,
                });
            } else {
                post.heart.map((hearts) => {
                    if (hearts.profile.toString() === user._id.toString()) {
                        hearts.isHeart = body.isHeart;
                    }
                });
            }
        }
        post
            .save()
            .then(async (posts) => {
                await session.commitTransaction();
                session.endSession();
                response.status(201).json({ posts });
            })
            .catch(async (err) => {
                await session.abortTransaction();
                session.endSession();
                return response.status(404).json({ error: err.message });
            });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const getPostForUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const date = new Date(Date.now()).getTime();
        const populate = {
            select: 'route nickname avatar',
            path: 'profile hashTags',
        };
        request.query.profile = user._id;
        const result = await paginateHandler(
            request.query,
            PostModel,
            null,
            populate
        );
        if (result == undefined) {
            await session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: 'post deleted' });
        }
        result.docs.map((doc: any) => {
            const d = new Date(doc.createdAt).getTime();
            doc.createdAt = parseInt(((date - d) / 1000 / 60).toFixed(0));
        });

        await session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const getPostAll = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const date = new Date(Date.now()).getTime();
        const hashTag = await HashTagsModel.find().sort({ count: -1 }).select('_id').limit(10);
        const arrayHashTags = hashTag.map((item) => { return item._id.toString() })
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
        }
        const result = await paginateHandler(
            request.query,
            PostModel,
            null,
            populate
        );
        if (result == undefined) {
            await session.abortTransaction();
            session.endSession();
            return response.status(500).json({ error: 'post deleted' });
        }
        result.docs.map((doc: any) => {
            const d = new Date(doc.createdAt).getTime();
            doc.createdAt = parseInt(((date - d) / 1000 / 60).toFixed(0));
            if (doc.heart != undefined) {
                doc.heartCount = doc.heart.length;
            }
        });

        await session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

const getComments = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const r: any = request;
    const user = r.user;
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const result = await paginateHandler(
            request.query,
            CommentModel,
            'profile description tagName postID',
            {
                path: 'tagName profile',
            }
        );
        await session.commitTransaction();
        session.endSession();
        return response.status(200).json({ result });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: error });
    }
};

export default {
    creatPost,
    commentPost,
    getPostForUser,
    getComments,
    getPostAll,
    heartPost,
};
