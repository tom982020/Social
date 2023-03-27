/** @format */

export interface ILogin {
	email: string;
	password: string;
	username: string;
}

export interface IRegister {
	email: any;
	username: any;
	password: any;
	phone: any;
}

export interface IProfile {
	nickname: string;
	DOB: string | null;
	BIO: string | null;
	destination: string | null;
}

export interface IProfileResponse {
	nickname: string;
	DOB: string | null;
	BIO: string | null;
	destination: string | null;
	avatar: string | null;
	avatar_saved: boolean;
}

export interface IAvatar {
	created_at: string;
	format: string;
	id: string;
	resource_type: string;
	secure_url: string;
	url: string;
}

export interface IPostResponse {
	_id: string,
	title: string,
	profile: {
		_id: string,
		route: string,
		nickname: string,
		avatar: {
			id: string,
			url: string,
			secure_url: string,
			format: string,
			resource_type: string,
			created_at: string
		}
	},
	description: string,
	typePost: string,
	image: {
		id: string,
		url: string,
		secure_url: string,
		format: string,
		resource_type: string,
		created_at: string
	},
	hashTags: [],
	deleted: false,
	imageArray: [],
	comment: [
		{
			profile: {
				_id: string,
				route: string,
				nickname: string,
				avatar: {
					id: string,
					url: string,
					secure_url: string,
					format: string,
					resource_type: string,
					created_at: string
				}
			},
			description: string,
			tagName: [
				{
					_id: string,
					route: string,
					nickname: string
				},
				{
					_id: string,
					route: string,
					nickname: string
				}
			],
			reactions: string,
			_id: string
		}
	],
	createdAt: string,
	updatedAt: string,
}