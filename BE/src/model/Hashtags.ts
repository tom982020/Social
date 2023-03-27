/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';
import { IHashtags } from '../interface/Schema/IHashtags';

export interface IHashtagsModel extends IHashtags, Document { }

const HashTagsSchema = new Schema(
    {
        description: {
            type: Schema.Types.String,
        },
        count: {
            type: Schema.Types.Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        collection: 'Hashtags',
    }
);

HashTagsSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
})

HashTagsSchema.plugin(paginate)

export default mongoose.model<IHashtags>('Hashtags', HashTagsSchema)