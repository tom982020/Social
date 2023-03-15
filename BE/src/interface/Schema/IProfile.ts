import mongoose, { Document, Schema } from 'mongoose';
import { ICloud } from './IStories';


export interface IProfile {
    nickname: string;
    authors: Schema.Types.ObjectId;
    DOB: string;
    BIO: string;
    avatar: ICloud;
    background: ICloud;
    destination: string;
    rank: Array<IRank>;
    deleted: boolean;
}

export interface IRank {
    id: Schema.Types.ObjectId;
    star: number;
}