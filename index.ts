import express from 'express';
// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookrouter from './src/routes/bookRoutes';
import { authorController } from './src/controllers/AuthorController';
import authorrouter from './src/routes/authorRoutes';
import categoryrouter from './src/routes/categoryRoutes';
import { env } from 'process';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// const port = 3000;

// const MONGO_URI:any = process.env.MONGO_URI ; 
const MONGO_URI = "mongodb+srv://jmadhavi156:joshi123@cluster0.qrvji3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.log('Failed to connect to the database:',error);
    });

app.use(express.json());
app.use('/book',bookrouter);
app.use('/author', authorrouter);
app.use('/category', categoryrouter);


app.listen(port, ()=> {
    console.log(`server started on port : ${port}`)
});
