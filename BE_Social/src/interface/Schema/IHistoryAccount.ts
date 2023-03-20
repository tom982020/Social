import mongoose, { Document, Schema } from 'mongoose';

export interface IHistoryAccount {
    idAccount: Schema.Types.ObjectId;
    description: string;
    type: string;
}