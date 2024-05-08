

// middleware/loginMiddleware
import bcrypt from 'bcrypt';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { Author } from '../models/Author';
import jwt from 'jsonwebtoken'
import { roleMiddleware } from '../utils/roleMiddleware';
import { iAuthor } from '../interface/model.interface';

interface Request extends ExpressRequest {
    adminToken?: string; // Define adminToken property as optional
}

export class AuthorLoginMiddleware{
    // author  login 
    public async loginMiddlewareAuthor(req:Request, res:Response, next:NextFunction) {
        const {username, password} = req.body;
        try {
            const author = await Author.findOne({username})
            if(!author){
                return res.status(404).json({messege:" author not found"})
            }
            const isPasswordCorrect = await bcrypt.compare(password, author.password)
            if(!isPasswordCorrect){
                return res.status(401).json({messege: "invalid credentials"})
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

   
    //check author is login
    isLoggedInAuthor = async(req:Request, res:Response) =>{
        try {
            let {id} = req.body;
            if (!id) {
                return res.status(400).json({ message: "Author ID is required." });
            }
            const validAuthor: iAuthor | null = await Author.findOne({_id:id, token: { $exists: true, $ne: "" }  })
            if (!validAuthor) {
                return res.status(401).json({ message: "Author is not logged in." });
            }
            res.status(200).json({ message: "Author is logged in.", author: validAuthor });    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    
   
    //generate token
    loginAuthor = async (req:Request, res:Response) =>{
        try {
            const {username, password} = req.body;
            const author = await Author.findOne({username})
            if(!author){
                return res.status(400).json({ message: "author  is required." });
            }
            const isPasswordCorrect = await bcrypt.compare(password, author.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({authorId:author._id, role: 'author'}, "BOOOM");
 
            const updatedUser = await Author.findByIdAndUpdate(
                author._id,
                { $set: { token } },
                { new: true }  //return ypdated document
            );
            // author.token = token;
            // await author.save();
            
            res.status(200).json({message: "Login Successfully", updatedUser})
       
        } catch (error) {
            // res.send(error);
            console.error(error);
            res.status(500).json({ message: 'Server error', error });    
        }
    }

    isAuthor = roleMiddleware.isAuthor; 
}










