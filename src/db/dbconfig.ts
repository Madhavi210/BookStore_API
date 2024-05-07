import mongoose from 'mongoose'
import dotenv from 'dotenv'


const MONGO_URI:any = process.env.MONGO_URI ; 

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('db  connected')
})
.catch(()=>{
    console.log("failed to connect");
});
