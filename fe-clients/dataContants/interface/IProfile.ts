/** @format */

import { IPage } from './IPage';

export interface IProfileResponse {
	nickname: string;
	BIO: string;
	DOB: string;
	destination: string;
	route: string;
	avatar: IAvatarResponse;
}

export interface IAvatarResponse {
	id: string;
	url: string;
	secure_url: string;
}

export interface ISearchProfileResponse extends IPage {
	nickname: string;
	avatar: IAvatarResponse;
}
