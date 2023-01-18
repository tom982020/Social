/** @format */

import mongoose, { Document, Schema } from 'mongoose';
const mongooseDelete = require('mongoose-delete');
import paginate from 'mongoose-paginate-v2';
import { authorConstants } from '../constant/author.constant';

export interface IAuthor {
	name: string;
	username: string;
	hasPassword: string;
	email: string;
	phone: string;
	access_token: string;
	refresh_token: string;
	deleted: boolean;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema = new Schema(
	{
		// name: { type: String, required: true },

		username: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		hasPassword: String,
		access_token: String,
		refresh_token: String,
		deleted: {
			type: Boolean,
			default: false,
		},
		type: {
			type: Schema.Types.Number,
			default: authorConstants.typeUsers.User,
		},
	},
	{
		timestamps: true,
		collection: 'Author',
	}
);

AuthorSchema.plugin(mongooseDelete, {
	overrideMethods: false,
	deletedAt: true,
	use$neOperator: false,
	// deleted: true
});

// paginate
AuthorSchema.plugin(paginate);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
