import mongoose from "mongoose";

export interface iBooks extends Document{
    title: string,
    author: mongoose.Schema.Types.ObjectId,
    category: mongoose.Schema.Types.ObjectId,
    ISBN: string,
    description: string,
    price: number
}

export interface iAuthor extends Document{
    name: string,
    biography: string,
    nationality: string,
    username: string,
    password: string
}

enum CategoryType {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Romance = "Romance",
    Thriller = "Thriller",
}
export  interface iCategory extends Document{
    name: CategoryType,
}
