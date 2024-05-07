
import express , {Request,Response} from 'express';
import {Author} from '../models/Author'
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import { log } from 'console';


export class AuthorService {
    createAuthor = async (req:Request, res:Response) =>{
            // const authorData = req.body;
            // const author = await Author.create(req.body);
            const hashedPassword = await bcrypt.hash(req.body.password, 10) 
            const author =  await Author.create({...req.body, password:hashedPassword});
           
            console.log(author);
            
            // return await newAuthor.save();
    }

    getAuthorById = async (req:Request, res:Response) => {
            const {id} = req.params;
            console.log({id});
            const author = await Author.findById(id);
            // console.log(author)
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.status(200).json({message:"author ", author});
    }

    updateAuthor = async (req:Request, res:Response) => {
        const {id} = req.params;
        // const updatedAuthorData = req.body;
        const author = await Author.findByIdAndUpdate(id);
            if (!author) {
                return null;
            }
            res.status(200).json(author)
            // Update author fields
            // author.set(updatedAuthorData)
            // const authorupdated = await author.save();
            // console.log(authorupdated);
            
    }

    deleteAuthor = async (req:Request, res:Response) =>{
            const {id} = req.params;
            const deletedAuthor = await Author.findByIdAndDelete(id);
            console.log(deletedAuthor) ;
            res.status(200).json({message:"author ", deletedAuthor});
    }
}

