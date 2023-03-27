import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';
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
        comment: [
            {
                profile: {
                    type: Schema.Types.ObjectId,
                    ref: 'Profile'
                },
                description: Schema.Types.String,
                tagName: [{
                    type: Schema.Types.ObjectId,
                    ref: 'Profile',
                }],
                reactions: Schema.Types.String,
                image: {
                    id: Schema.Types.String,
                    url: Schema.Types.String,
                    secure_url: Schema.Types.String,
                    format: Schema.Types.String,
                    resource_type: Schema.Types.String,
                    created_at: Schema.Types.String,
                }
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
PostSchema.plugin(paginate)

export default mongoose.model<IPost>('Post', PostSchema)