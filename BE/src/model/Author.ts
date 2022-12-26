import mongoose, { Document, Schema } from "mongoose";


export interface IAuthor {
  name: string;
  username: string;
  hasPassword: string;
  email: string;
  phone: string;
  access_token:string;
  refresh_token:string;
  created:Date;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema = new Schema({
  name: { type: String, required: true },

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
  access_token:String,
  refresh_token:String,
  created:{
    type:Date,
    required:true
  }
});




export default mongoose.model<IAuthorModel>("Author", AuthorSchema);
