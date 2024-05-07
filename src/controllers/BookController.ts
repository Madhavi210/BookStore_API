

import express, {Request, Response} from 'express'
import { bookService } from '../services/BookService'
import { ErrorClass } from '../helper/errorHelper'
import { Books } from '../models/Book';


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
            // res.status(500).json({ error: 'Internal Server Error' });
            // const profileerror = obj.errorHelper(error)


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
    
     deleteBookById = async(req:Request, res:Response) => {
        try {
            await bookObj.deleteBookById(req, res)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            const profileerror = obj.errorHelper(error);
        }
    }
    
    // updateBookByAuthor = async (req: Request, res: Response) => {
    //     const { id } = req.params; // Get book ID from request params
    //     const { title, description, price } = req.body; // Get updated book data from request body

    //     try {
    //         // Find the book by ID
    //         const book = await Books.findById(id);

    //         if (!book) {
    //             return res.status(404).json({ message: 'Book not found' });
    //         }

    //         // Check if the author of the book matches the authenticated author
    //         if (book.author !== req.user.id) {
    //             return res.status(403).json({ message: 'You are not authorized to update this book' });
    //         }

    //         // Update book data
    //         book.title = title;
    //         book.description = description;
    //         book.price = price;

    //         // Save the updated book
    //         await book.save();

    //         return res.status(200).json({ message: 'Book updated successfully', book });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

    // deleteBookByAuthor = async (req: Request, res: Response)=> {
    //     const { id } = req.params; // Get book ID from request params

    //     try {
    //         // Find the book by ID
    //         const book = await Books.findById(id);

    //         if (!book) {
    //             return res.status(404).json({ message: 'Book not found' });
    //         }

    //         // Check if the author of the book matches the authenticated author
    //         if (book.author !== req.user.id) {
    //             return res.status(403).json({ message: 'You are not authorized to delete this book' });
    //         }

    //         // Delete the book
    //         await book.remove();

    //         return res.status(200).json({ message: 'Book deleted successfully' });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //     }
    // }
}

