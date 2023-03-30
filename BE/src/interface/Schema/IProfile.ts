import mongoose, { Document, Schema } from 'mongoose';
import { ICloud } from './IStories';


export interface IProfile {
    nickname: string;
    route: string;
    authors: Schema.Types.ObjectId;
    DOB: string;
    avatar_saved: boolean;
    BIO: string;
    avatar: ICloud;
    background: ICloud;
    destination: string;
    follow: Array<IFollow>
    rank: Array<IRank>;
    deleted: boolean;
}
export interface IFollow {
    id: Schema.Types.ObjectId;
    typeFollow: number;
}
export interface IRank {
    id: Schema.Types.ObjectId;
    star: number;
}

export interface IFriend {
    idProfile: Schema.Types.ObjectId;
    idFriend: Schema.Types.ObjectId;
    accept: boolean;
    deleted:boolean;
}