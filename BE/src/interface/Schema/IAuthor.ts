import mongoose, { Document, Schema } from 'mongoose';
export interface IAuthor {
    name: string;
    username: string;
    exist_Profile: boolean;
    hasPassword: string;
    email: string;
    phone: string;
    access_token: string;
    refresh_token: string;
    historyLogin: Array<IHistoryLogin>;
    deleted: boolean;
}

export interface IHistoryLogin {
    username: string;
    idProfile: Schema.Types.ObjectId;
    dateLogin: Date;
}

export interface IAuthorResponse {
    _id: Schema.Types.ObjectId;
    name: string | null;
    username: string | null;
    hasPassword: string | null;
    exist_Profile: boolean | null;
    email: string | null;
    phone: string | null;
    access_token: string | null;
    refresh_token: string | null;
    historyLogin: Array<IHistoryLogin> | null;
    deleted: boolean | null;
}