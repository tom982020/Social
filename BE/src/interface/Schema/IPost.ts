import mongoose, { Document, Schema } from 'mongoose';
import { ICloud } from './IStories';

export interface IPost {
    title: string;
    profile: Schema.Types.ObjectId;
    description: string;
    image: ICloud;
    typePost: string;
    imageArray: Array<ICloud>;
    video: ICloud;
    hashTags: Array<Schema.Types.ObjectId>;
    comment: Array<IComment>;
    share: IPost;
}

export interface IComment {
    profile: Schema.Types.ObjectId;
    description: string;
    tagName: Array<Schema.Types.ObjectId>;
    reactions: string;
    image: ICloud | null;
}