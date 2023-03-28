import mongoose, { Document, Schema } from 'mongoose';
import { ICloud } from './IStories';

export interface IComment {
    profile: Schema.Types.ObjectId;
    description: string;
    tagName: Array<Schema.Types.ObjectId>;
    postID: Schema.Types.ObjectId;
    reactions: string;
    image: ICloud | null;
    commentParent: Schema.Types.ObjectId;
}