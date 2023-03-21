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
	DOB: string;
	BIO: string;
	destination: string;
}

export interface IAvatar { 
	created_at:string;
	format:string;
	id:string;
	resource_type:string;
	secure_url:string;
	url: string;
}
