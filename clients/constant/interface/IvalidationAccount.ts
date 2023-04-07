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
	route: string;
	authors: any;
}

export interface IProfileRequest {
	nickname: string;
	DOB: string | null;
	BIO: string | null;
	destination: string | null;
	avatar: string | null;
	avatar_saved: boolean;
	route: string;
	rank: number;
	evaluate: number;
	authors: any;
	follow: [];
}

export interface IAvatar {
	created_at: string;
	format: string;
	id: string;
	resource_type: string;
	secure_url: string;
	url: string;
}

export interface IPagePostResult {
	docs: IPostResponse[],
	limit: number,
	page: number,
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
	createdAt: string,
	updatedAt: string,
}
export interface PageResult {
	page: number,
	limit: number,
	totalDocs: number,
	totalPages: number,
}
export interface CommentResponse extends PageResult {
	description: string,
	postID: string,
	profile: {
		id: string,
		nickname: string,
		route: string,
		avatar: {
			createdAt: string,
			format: string,
			id: string,
			resource_type: string,
			secure_url: string,
			url: string,
		}
	}
	tagName: tagNameResponse[],
	id: string,
}



export interface tagNameResponse {
	id: string,
	nickname: string,
	route: string,
}