/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import { Timezone } from 'node-schedule';
import { reactionConstants } from '../constant/iconReact.constant';
const mongooseDelete = require('mongoose-delete');
import paginate from 'mongoose-paginate-v2';


export interface IAuthor {
	id: Schema.Types.ObjectId;
	like: string;
}

export interface IStories {
	images: string;
	videos: string;
	title: string;
	isSave: boolean;
	description: string;
	timespan: Schema.Types.Date;
	profile: Schema.Types.ObjectId;
	views: Array<IAuthor>;
	deleted: false;
}

export interface IStoriesModel extends IStories, Document {}

const StoriesSchema = new Schema(
	{
		image: {
			type: Schema.Types.String,
			require: true,
		},
		video: { type: Schema.Types.String },
		title: {
			type: Schema.Types.String,
		},
		isSave: {
			type: Schema.Types.Boolean,
			default: false,
		},
		description: {
			type: Schema.Types.String,
		},
		timespan: Schema.Types.Date,
		profile: Schema.Types.ObjectId,
		views: [
			{
				id: Schema.Types.ObjectId,
				like: Schema.Types.String,
			},
		],
		deleted: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: 'Stories',
	}
);

StoriesSchema.plugin(mongooseDelete, {
	overrideMethods: false,
	deletedAt: true,
	use$neOperator: false,
	// deleted: true
});


// paginate
StoriesSchema.plugin(paginate)

export default mongoose.model<IStoriesModel>('Profile', StoriesSchema);

