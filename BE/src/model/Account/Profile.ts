/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';
import { profileContants } from '../../constant/profile.contant';
import { IProfile } from '../../interface/Schema/IProfile';

export interface IProfileModel extends IProfile, Document { }

const ProfileSchema = new Schema(
	{
		authors: {
			type: Schema.Types.ObjectId,
			ref: 'Author',
			default: null,
		},
		route: {
			type: Schema.Types.String
		},
		nickname: {
			type: Schema.Types.String,
			default: null,
		},
		DOB: {
			type: Schema.Types.String,
			default: null,
		},
		BIO: {
			type: Schema.Types.String,
			default: null,
		},
		avatar: {
			id: Schema.Types.String,
			url: Schema.Types.String,
			secure_url: Schema.Types.String,
			format: Schema.Types.String,
			resource_type: Schema.Types.String,
			created_at: Schema.Types.String,
		},
		background: {
			id: Schema.Types.String,
			url: Schema.Types.String,
			secure_url: Schema.Types.String,
			format: Schema.Types.String,
			resource_type: Schema.Types.String,
			created_at: Schema.Types.String,
		},
		destination: {
			type: Schema.Types.String,
			default: null,
		},
		rank: [
			{
				id: {
					type: Schema.Types.ObjectId,
					ref: 'Profile'
				},
				star: {
					type: Schema.Types.Number,
					default: 0,
				},
			},
		],
		friend: [
			{
				id: {
					type: Schema.Types.ObjectId,
					ref: 'Profile'
				},
				accept: {
					type: Schema.Types.Boolean,
					default: false
				}
			}
		],
		follow: [
			{
				id: {
					type: Schema.Types.ObjectId,
					ref: 'Profile'
				},
				typeFollow: {
					type: Schema.Types.String,
					default: profileContants.typeFollow.NormalPerson
				}
			}
		],
		deleted: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: 'Profile',
	}
);

ProfileSchema.plugin(mongooseDelete, {
	overrideMethods: false,
	deletedAt: true,
	use$neOperator: false,
	// deleted: true
});

// paginate
ProfileSchema.plugin(paginate);

export default mongoose.model<IProfileModel>('Profile', ProfileSchema);
