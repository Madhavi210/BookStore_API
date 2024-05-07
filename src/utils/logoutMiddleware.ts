import { Author } from './../models/Author';
import { Request, Response } from 'express'; 


export class logoutMiddleware{
    public async logout(req:Request, res:Response) {
        const {id} = req.params;
        try {
            const author = await Author.findById(id);
            if(!author){
                return res.status(404).json({message:"author not found"})
            }
            //  author.token = "";
             await author.save();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }


    }
}