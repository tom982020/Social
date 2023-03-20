import mongoose, { Document, Schema } from 'mongoose';
import { constantsStory } from '../../constant/stories.constant';
import { IAuthor } from './IAuthor';

export interface ICloud {
    id: string | null;
    url: string;
    secure_url: string;
    format: string;
    resource_type: string;
    created_at: string;
}
export interface IStories {
    images: ICloud;
    video: ICloud;
    title: string;
    isSave: boolean;
    description: string;
    timespan: Schema.Types.String;
    profiles: Schema.Types.ObjectId;
    views: Array<{
        account: Schema.Types.ObjectId;
        react: {
            type: string
        }
    }>;
    typeStories: {
        type: string;
        default: 'public',
    },
    currentStatus: string;
    deleted: false;
}