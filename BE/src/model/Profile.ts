/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

export interface IRank {
	id: Schema.Types.ObjectId;
	star: number;
}

export interface IProfile {
	nickname: string;
	authors: Schema.Types.ObjectId;
	DOB: string;
	BIO: string;
	avatar: string;
	background: string;
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
			type: Schema.Types.String,
			default: null,
		},
		background: {
			type: Schema.Types.String,
			default: null,
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
ProfileSchema.plugin(paginate)

export default mongoose.model<IProfileModel>('Profile', ProfileSchema);
