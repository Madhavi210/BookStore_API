import mongoose, {Schema, Document} from 'mongoose'

// Define enum for category types
enum CategoryType {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Romance = "Romance",
    Thriller = "Thriller",
}

export  interface iCategory extends Document{
     name: CategoryType,
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

