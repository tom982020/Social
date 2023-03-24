import { IProfile } from '../interface/Schema/IProfile';
import ProfileModel from '../model/Account/Profile';
import uploadIMage from '../service/uploadImage.service';

export const handleAvatar = async () => {
    const profile = await ProfileModel.find({
        avatar_saved: false
    })

    profile.map(async (item) => {
        let profileChild: any = await ProfileModel.findById(item._id)
        if (profileChild?.avatar?.id != undefined) {
            await uploadIMage.deleteImage(profileChild?.avatar?.id)
        }
        profileChild.avatar = {}
        profileChild.save()
    })
}