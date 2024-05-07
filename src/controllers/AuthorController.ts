import { Author } from './../models/Author';
import express, {Request, Response} from 'express'
// import { bookService } from '../services/BookService'
import { ErrorClass } from '../helper/errorHelper'
import { AuthorService } from '../services/AuthorService';

const obj = new ErrorClass;
const authorObj = new AuthorService();

export class authorController{
    createAuthor = async(req:Request, res:Response) =>{
        try {
             await authorObj.createAuthor(req,res);
             console.log("author added ");
             res.status(200).json({ messege: 'author added' });
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getAuthorById = async(req:Request, res:Response) =>{
        try {
            await authorObj.getAuthorById(req,res);
            res.status(200).json({ messege: 'author by id' });
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    updateAuthor = async(req:Request, res:Response) =>{
        try {
            await authorObj.updateAuthor(req,res);
            // res.status(200).json({ messege: 'author updated' });
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    deleteAuthor  = async(req:Request, res:Response) =>{
        try {
            await authorObj.deleteAuthor(req,res);
            res.status(200).json({ messege: 'author deleted' });
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
