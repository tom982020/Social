import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from './IComment';
import { ICloud } from './IStories';

export interface IPost {
    title: string;
    profile: Schema.Types.ObjectId;
    description: string;
    heart: Array<IHeart>;
    image: ICloud;
    typePost: string;
    imageArray: Array<ICloud>;
    video: ICloud;
    hashTags: Array<Schema.Types.ObjectId>;
    share: IPost;
}

export interface IHeart {
    profile: Schema.Types.ObjectId,
    isHeart: boolean,
}


