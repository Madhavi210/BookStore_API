import mongoose, {Schema, Document} from 'mongoose'
import { Author } from './Author';

export interface Books extends Document{
     title: string,
     author: mongoose.Schema.Types.ObjectId,
     category: mongoose.Schema.Types.ObjectId,
     ISBN: string,
     description: string,
     price: number
}

const bookSchema: Schema = new Schema<Books>({
     title:{
        type:String,
        required: true,
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
     },
     category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
     },
     ISBN: {
        type: String,
        required: true,
     },
     description:{
        type:String,
        required: true,
     },
     price:{
        type:Number,
        required: true,
     }

})

export const  Books =  mongoose.model<Books>("Books", bookSchema);

