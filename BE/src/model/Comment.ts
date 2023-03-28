import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { IComment } from '../interface/Schema/IComment';

export interface ICommentModel extends IComment, Document { }


const CommentSchema = new Schema(
    {
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        description: {
            type: Schema.Types.String,
        },
        tagName: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
            }
        ],
        postID: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        image: {
            id: Schema.Types.String,
            url: Schema.Types.String,
            secure_url: Schema.Types.String,
            format: Schema.Types.String,
            resource_type: Schema.Types.String,
            created_at: Schema.Types.String,
        },
        reactions: {
            type: Schema.Types.String,
        },
        commentParent: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    },
    {
        timestamps: true,
        collection: 'Comment',
    }
)

CommentSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
})

// paginate
CommentSchema.plugin(mongoosePagination)

const Comment: Pagination<ICommentModel> = mongoose.model<IComment, Pagination<ICommentModel>>('Comment', CommentSchema)

export default Comment