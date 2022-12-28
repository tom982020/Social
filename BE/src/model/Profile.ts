/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

export interface IRank {
	id: Schema.Types.ObjectId;
	star: number;
}

export interface ICloud {
	id: string;
	url: string;
	secure_url: string;
	format: string;
	resource_type: string;
	created_at: string;
}

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

export interface IProfileModel extends IProfile, Document {}

const ProfileSchema = new Schema(
	{
		authors: {
			type: Schema.Types.ObjectId,
			ref: 'Author',
			default: null,
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
				id: Schema.Types.ObjectId,
				star: {
					type: Schema.Types.Number,
					default: 0,
				},
			},
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
