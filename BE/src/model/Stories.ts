/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import { Timezone } from 'node-schedule';
import { reactionConstants } from '../constant/iconReact.constant';
const mongooseDelete = require('mongoose-delete');
import paginate from 'mongoose-paginate-v2';
import { IStories } from '../interface/Schema/IStories';

export interface IStoriesModel extends IStories, Document { }

const StoriesSchema = new Schema(
	{
		image: {
			id: Schema.Types.String,
			url: Schema.Types.String,
			secure_url: Schema.Types.String,
			format: Schema.Types.String,
			resource_type: Schema.Types.String,
			created_at: Schema.Types.String,
		},
		video: {
			id: Schema.Types.String,
			url: Schema.Types.String,
			secure_url: Schema.Types.String,
			format: Schema.Types.String,
			resource_type: Schema.Types.String,
			created_at: Schema.Types.String,
		},
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
StoriesSchema.plugin(paginate);

export default mongoose.model<IStoriesModel>('Profile', StoriesSchema);
