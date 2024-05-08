
import mongoose, {Schema, Document} from 'mongoose'
import {iAuthor} from '../interface/model.interface'


const authorSchema: Schema = new Schema<iAuthor>({
     name:{
        type:String,
        required: true,
     },
     biography:{
        type:String,
        required: true,
     },
     nationality:{
        type:String,
        required: true,
     },
     username:{
      type: String,
      required: true,
      unique: true,
     },
     password: {
      type: String,
      required:true,
     },
     token:{
      type:String,
     }

})

export const  Author =  mongoose.model<iAuthor>("Author", authorSchema);

