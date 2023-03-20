import mongoose from "mongoose";
import {config} from "./config/config";
import Logging from "./library/Logging";

mongoose.set("strictQuery", false);
mongoose.connect(config.mongo.url, {
    retryWrites: true,
    w:'majority'
}).then(()=> {
    Logging.info('Connected to Mongoose')})
.catch((err:any)=> Logging.error(err));