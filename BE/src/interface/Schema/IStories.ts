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
    videos: ICloud;
    title: string;
    isSave: boolean;
    description: string;
    timespan: Schema.Types.Date;
    profile: Schema.Types.ObjectId;
    views: Array<{
        account: Schema.Types.ObjectId;
        seen: {
            type: boolean,
            default: false
        }
    }>;
    type: {
        type: string;
        default: 'public',
    }
    deleted: false;
}