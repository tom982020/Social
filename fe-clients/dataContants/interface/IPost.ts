import { IPage } from "./IPage";
import { IAvatarResponse, IProfileResponse } from "./IProfile";

export interface IPost extends IPage{
    image: IAvatarResponse;
    profile: IProfileResponse;
    title: string;
    typePost: string;
    updatedAt: string;
    createdAt: string;
    description: string;
    hashTags: Array<hashTag>;
    heartCount: number;
}

export interface hashTag{
    description: string;
}