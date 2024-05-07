import mongoose, {Schema, Document} from 'mongoose'
import { Author } from './Author';
import {iBooks} from '../interface/model.interface'



const bookSchema: Schema = new Schema<iBooks>({
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

export const  Books =  mongoose.model<iBooks>("Books", bookSchema);

