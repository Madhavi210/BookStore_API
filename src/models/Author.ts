
import mongoose, {Schema, Document} from 'mongoose'

export interface Author extends Document{
    name: string,
    biography: string,
    nationality: string,
    username: string,
    password: string
}

const authorSchema: Schema = new Schema<Author>({
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
     }

})

export const  Author =  mongoose.model<Author>("Author", authorSchema);

