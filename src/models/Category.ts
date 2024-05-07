import mongoose, {Schema, Document} from 'mongoose'
import {iCategory} from '../interface/model.interface';

enum CategoryType {
     Fiction = "Fiction",
     NonFiction = "Non-Fiction",
     Romance = "Romance",
     Thriller = "Thriller",
 }
 
const categorySchema: Schema = new Schema<iCategory>({
     name:{
        type:String,
        enum: Object.values(CategoryType), 
        required: true, 
        unique: true 
     },
})

export  const  Category =  mongoose.model<iCategory>("Category", categorySchema);

