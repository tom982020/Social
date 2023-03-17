/** @format */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleSingleUploadFile, handleSingleUploadFileNoLimit, handleSingleVideo } from '../../library/handleSingleUploadFile';
import ProfileModel from '../../model/Account/Profile';
import StoryModel from '../../model/Stories'
import uploadIMage from '../../service/uploadImage.service';
import fs from 'fs'
import moment from 'moment';
import { IStories } from '../../interface/Schema/IStories';
import checkElementAlready from '../../library/checkObject'




const createStoriesImage = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    const r: any = request
    const user = r.user
    try {
        const profile = await ProfileModel.findOne({ authors: user.id }).lean();
        if (profile == null) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            })
        } else {
            await handleSingleUploadFileNoLimit(request, response).then(async (result: any) => {
                const images = await uploadIMage.uploadImage(result.file.path);
                fs.unlinkSync(result.file.path)

                const image = {
                    id: images?.public_id,
                    url: images?.url,
                    secure_url: images?.secure_url,
                    format: images?.format,
                    resource_type: images?.resource_type,
                    created_at: images?.created_at,
                }
                const formData = {
                    image: image,
                    title: request.body.title,
                    description: request.body.description,
                    timespan: moment(Date.now()),
                    typeStories: request.body.typeStories,
                    profiles: profile._id,
                }
                const stories = new StoryModel(formData)
                return stories
                    .save({ session: session })
                    .then(async (story) => {
                        await session.commitTransaction()
                        session.endSession();
                        response.status(200).json({ story })
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        session.endSession();
                        response.status(500).json({ error })
                    })
            }).catch(async (error) => {
                await session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message })
            })
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}

const createStoriesVideo = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    const r: any = request
    const user = r.user
    try {
        const profile = await ProfileModel.findOne({ authors: user.id }).lean();
        if (profile == null) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            })
        } else {
            await handleSingleVideo(request, response).then(async (result: any) => {
                const images = await uploadIMage.uploadShortVideo(result.file.path);
                fs.unlinkSync(result.file.path)

                const image = {
                    id: images?.public_id,
                    url: images?.url,
                    secure_url: images?.secure_url,
                    format: images?.format,
                    resource_type: images?.resource_type,
                    created_at: images?.created_at,
                }
                const formData = {
                    video: image,
                    title: request.body.title,
                    description: request.body.description,
                    timespan: moment(Date.now()),
                    typeStories: request.body.typeStories,
                    profiles: profile._id,
                }
                const stories = new StoryModel(formData)
                return stories
                    .save({ session: session })
                    .then(async (story) => {
                        await session.commitTransaction()
                        session.endSession();
                        response.status(200).json({ story })
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        session.endSession();
                        response.status(500).json({ error })
                    })
            }).catch(async (error) => {
                await session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message })
            })
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}

const updateStoriesVideo = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    const r: any = request
    const user = r.user
    const id = request.params.id
    try {
        const profile = await ProfileModel.findOne({ authors: user.id }).lean();
        if (profile == null) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            })
        } else {
            await handleSingleVideo(request, response).then(async (result: any) => {
                await StoryModel.findById(id).then(async (story) => {
                    if (story == null) {
                        await session.abortTransaction();
                        session.endSession();
                        return response.status(404).json({
                            status: false, message: 'story not found'
                        })
                    }
                    if (story.video.id) {
                        await uploadIMage.deleteImage(story.video.id);
                    }
                    const images = await uploadIMage.uploadVideo(result.file.path);
                    fs.unlinkSync(result.file.path)
                    const video = {
                        id: images?.public_id,
                        url: images?.url,
                        secure_url: images?.secure_url,
                        format: images?.format,
                        resource_type: images?.resource_type,
                        created_at: images?.created_at,
                    }
                    const formData = {
                        video: video,
                        title: request.body.title,
                        description: request.body.description,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                        currentStatus: request.body.currentStatus
                    }
                    story.set(formData)
                        .save()
                        .then(async (stories: IStories) => {
                            await session.commitTransaction()
                            session.endSession();
                            response.status(200).json({ story })
                        })
                        .catch(async (error) => {
                            await session.abortTransaction();
                            session.endSession();
                            response.status(500).json({ error })
                        })
                }).catch(async (error) => {
                    await session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error })
                })

            }).catch(async (error) => {
                await session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message })
            })
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}

const updateStoriesImage = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    const r: any = request
    const user = r.user
    const id = request.params.id
    try {
        const profile = await ProfileModel.findOne({ authors: user.id }).lean();
        if (profile == null) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            })
        } else {
            await handleSingleUploadFileNoLimit(request, response).then(async (result: any) => {
                await StoryModel.findById(id).then(async (story) => {
                    if (story == null) {
                        await session.abortTransaction();
                        session.endSession();
                        return response.status(404).json({
                            status: false, message: 'story not found'
                        })
                    }
                    if (story.video.id) {
                        await uploadIMage.deleteImage(story.video.id);
                    }
                    const images = await uploadIMage.uploadImage(result.file.path);
                    fs.unlinkSync(result.file.path)
                    const image = {
                        id: images?.public_id,
                        url: images?.url,
                        secure_url: images?.secure_url,
                        format: images?.format,
                        resource_type: images?.resource_type,
                        created_at: images?.created_at,
                    }
                    const formData = {
                        image: image,
                        title: request.body.title,
                        description: request.body.description,
                        typeStories: request.body.typeStories,
                        profiles: profile._id,
                        currentStatus: request.body.currentStatus
                    }
                    story.set(formData)
                        .save()
                        .then(async (stories: IStories) => {
                            await session.commitTransaction()
                            session.endSession();
                            response.status(200).json({ story })
                        })
                        .catch(async (error) => {
                            await session.abortTransaction();
                            session.endSession();
                            response.status(500).json({ error })
                        })
                }).catch(async (error) => {
                    await session.abortTransaction();
                    session.endSession();
                    response.status(500).json({ error })
                })

            }).catch(async (error) => {
                await session.abortTransaction();
                session.endSession();
                response.status(400).json({ error: error.message })
            })
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}

const updateViewStory = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    const r: any = request
    const user = r.user
    const id = request.params.id
    try {
        const profile = await ProfileModel.findOne({ authors: user.id }).lean();
        if (profile == null) {
            await session.abortTransaction();
            session.endSession();
            return response.status(404).json({
                status: false, message: 'Profile not found'
            })
        } else {
            await StoryModel.findById(id).then(async (story) => {
                if (story == null) {
                    await session.abortTransaction();
                    session.endSession();
                    return response.status(404).json({
                        status: false, message: 'story not found'
                    })
                }
                if (story.profiles.toString() != profile._id.toString()) {
                    let check: boolean = false;
                    await story.views.find((element: any) => {
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
                        })
                    }

                }
                story
                    .save()
                    .then(async (stories: IStories) => {
                        await session.commitTransaction()
                        session.endSession();
                        response.status(200).json({ story })
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        session.endSession();
                        response.status(500).json({ error })
                    })

            }).catch(async (error) => {
                await session.abortTransaction();
                session.endSession();
                response.status(500).json({ error })
            })
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return response.status(500).json({ error: err });
    }
}



export default {
    createStoriesImage,
    createStoriesVideo,
    updateStoriesVideo,
    updateViewStory,
    updateStoriesImage
}