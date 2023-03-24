import schedule from 'node-cron'
import { handleAvatar } from '../Job/profile.job';
import {StoriesJob} from '../Job/stories.job'


export class CronJob  {
    constructor(){
        this.cronStories();
}

    cronStories = async ()=>{
        schedule.schedule('* * 0 * * *', async () => {
            try {
                handleAvatar()
            } catch (err) {
                console.log(err)
            }
        })
    }
    
}
