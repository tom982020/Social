import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { postConstant } from '../constant/post.constant';
import { IPost } from '../interface/Schema/IPost';


export interface IPostModel extends IPost, Document { }

const PostSchema = new Schema(
    {
        title: {
            type: Schema.Types.String,
            require: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            require: true,
        },
        heart: [
            {
                profile: {
                    type: Schema.Types.ObjectId,
                    ref: 'Profile',
                },
                isHeart: {
                    type: Schema.Types.Boolean,
                    default: false,
                }
            }
        ],
        description: {
            type: Schema.Types.String,
        },
        typePost: {
            type: Schema.Types.String,
            default: postConstant.TYPEPOST.PUBLIC,
            require: true,
        },
        image: {
            id: Schema.Types.String,
            url: Schema.Types.String,
            secure_url: Schema.Types.String,
            format: Schema.Types.String,
            resource_type: Schema.Types.String,
            created_at: Schema.Types.String,
        },
        imageArray: [
            {
                id: Schema.Types.String,
                url: Schema.Types.String,
                secure_url: Schema.Types.String,
                format: Schema.Types.String,
                resource_type: Schema.Types.String,
                created_at: Schema.Types.String,
            }
        ],
        video: {
            id: Schema.Types.String,
            url: Schema.Types.String,
            secure_url: Schema.Types.String,
            format: Schema.Types.String,
            resource_type: Schema.Types.String,
            created_at: Schema.Types.String,
        },
        hashTags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Hashtags'
            }
        ],
        share: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    },
    {
        timestamps: true,
        collection: 'Post',
    }
)

PostSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
})

// paginate
PostSchema.plugin(mongoosePagination)

const Post: Pagination<IPostModel> = mongoose.model<IPost, Pagination<IPostModel>>('Post', PostSchema)

export default Post