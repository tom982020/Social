import schedule from 'node-cron'
import {StoriesJob} from '../Job/stories.job'


export class CronJob  {
    constructor(){
        this.cronStories();
}

    cronStories = async ()=>{
        schedule.schedule('* * * * * *', async () => {
            StoriesJob
            // console.log('success')
        })
    }
    
}
