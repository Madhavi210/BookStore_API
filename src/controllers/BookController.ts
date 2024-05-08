

import express, {Request, Response} from 'express'
import { bookService } from '../services/BookService'
import { ErrorClass } from '../helper/errorHelper'
import { Books } from '../models/Book';
import { Author } from '../models/Author';
import mongoose from 'mongoose';


const obj = new ErrorClass;
const bookObj = new bookService();

export class bookController{
    getAllBook = async(req:Request, res:Response) =>{
        try {
            await bookObj.getAllBook(req,res)
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getBookById = async(req:Request, res:Response) => {
        try {
            await bookObj.getBookById(req,res)
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    postBooks = async(req:Request, res:Response) => {
        try {
            await bookObj.postBook(req, res);
            console.log("book added from controller");
            
        } catch (error) {
            console.log(error);
            const profileerror = obj.errorHelper(error)
            res.status(500).json({profileerror});


        }
    }

    // removeBook = async (req:Request, res:Response) => {
    //     try {
    //         await bookObj.removeBook(req,res)
    //     } catch (error) {
    //         res.status(500).json({ error: 'Internal Server Error' });
    //         const profileerror = obj.errorHelper(error)
    //     }
    // }
    
    //  deleteBookById = async(req:Request, res:Response) => {
    //     try {
    //         await bookObj.deleteBookById(req, res)
    //     } catch (error) {
    //         res.status(500).json({ error: 'Internal Server Error' });
    //         const profileerror = obj.errorHelper(error);
    //     }
    // }
    
    updateBookByAuthors = async (req: Request, res: Response) => {
        try {
            await bookObj.updateBookByAuthors(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    deleteBookByAuthor = async (req: Request, res: Response)=> {
        try {
            await bookObj.deleteBookByAuthor(req,res)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}



