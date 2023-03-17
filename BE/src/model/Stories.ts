/** @format */

import mongoose, { Document, Schema } from 'mongoose';
import { Timezone } from 'node-schedule';
import { reactionConstants } from '../constant/iconReact.constant';
const mongooseDelete = require('mongoose-delete');
import paginate from 'mongoose-paginate-v2';
import { IStories } from '../interface/Schema/IStories';
import { constantsStory } from '../constant/stories.constant';
import { string } from 'joi';

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
		profiles: {
			type: Schema.Types.ObjectId,
			ref: 'Profile'
		},
		views: [
			{
				account: Schema.Types.ObjectId,
				react: Schema.Types.String,
			},
		],
		typeStories: {
			type: Schema.Types.String,
			default: constantsStory.typestories.public
		},
		currentStatus: {
			type: Schema.Types.String,
			default: constantsStory.typeCurrent.display
		},
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

export default mongoose.model<IStoriesModel>('Stories', StoriesSchema);
