// // src/utils/authMiddleware.ts

// middleware/loginMiddleware
import bcrypt from 'bcrypt';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { Author } from '../models/Author';
import jwt from 'jsonwebtoken'
import { roleMiddleware } from '../utils/roleMiddleware';

// import { verifyToken } from './jwtUtils';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

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

    loginMiddlewareAdmin = async (req:Request, res:Response, next:NextFunction) =>{
        const {username, password} = req.body;
        try {
            const isAdmin = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
            if (!isAdmin) {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    //check author is login
    isLoggedInAuthor = async(req:Request, res:Response) =>{
        try {
            let {id} = req.body;
            let validAuthor: Author | null = await Author.findOne({_id:id, $expr:{$gt:[{$strLenCP:"$token"}, 0]}})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    
    isLoggedInAdmin= async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const { username, password } = req.body;
            const isAdmin = username === 'admin' && password === 'admin123';
            if (!isAdmin) {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
            const token = jwt.sign({ userId: 'admin', role: 'admin' }, 'bhooom');
            // Attach admin token to request object for further processing if needed
            req.adminToken = token;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
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
                { new: true }
            );
            
            res.status(200).json({message: "Login Successfully", author})
       
        } catch (error) {
            // res.send(error);
            console.error(error);
            res.status(500).json({ message: 'Server error', error });    
        }
    }

    loginAdmin = async(req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
    
            // Check if provided admin credentials match predefined admin credentials
            const isAdmin = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
            if (!isAdmin) {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
    
            // If admin credentials are valid, generate JWT token with admin role
            const token = jwt.sign({ userId: 'admin', role: 'admin' }, 'bhooom');
            res.status(200).json({ message: 'Admin login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }

    }

    isAdmin = roleMiddleware.isAdmin; // Assign isAdmin method from RoleMiddleware class
    isAuthor = roleMiddleware.isAuthor; 
}










