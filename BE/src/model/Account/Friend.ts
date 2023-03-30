import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IFriend } from '../../interface/Schema/IProfile';

export interface IFriendModel extends IFriend, Document { }

const FriendSchema = new Schema(
    {
        idProfile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        },
        idFriend: {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        },
        accept: {
            type: Schema.Types.Boolean,
            default: false
        },
        deleted: {
            type: Schema.Types.Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        collection: 'Friend',
    }
)


FriendSchema.plugin(mongooseDelete, {
    overrideMethods: false,
    deletedAt: true,
    use$neOperator: false,
    deleted: true
});

// paginate
FriendSchema.plugin(mongoosePagination);
const Profile: Pagination<IFriendModel> = mongoose.model<IFriend, Pagination<IFriendModel>>('Friend', FriendSchema)

export default Profile