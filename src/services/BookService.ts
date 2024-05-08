import { Category } from '../models/Category';
import { Author } from './../models/Author';
import { Books } from './../models/Book';
import express , {Request,Response} from 'express';
// import Books from '../models/Book'

export class bookService {
    //get book by id
    getBookById = async (req:Request, res:Response) =>{
        const {id} = req.params;
        const book = await Books.findById(id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book)
        console.log(book);   
    }

    //get all books 
    getAllBook = async (req:Request ,res:Response)  => {
        // const book =  await Books.find({})
        // res.status(200).json(book)
            try {
                const { page = 1, limit = 10, search = '', category = '' } = req.query;
                const query: any = {};
    
                // Apply search filter
                if (typeof search === 'string') {
                    query.title = { $regex: new RegExp(search, 'i') };
                }
    
                // Apply category filter
                if (category) {
                    query.category = category;
                }
    
                // Perform pagination and retrieve books
                const books = await Books.find(query)
                    .limit(Number(limit))
                    .skip((Number(page) - 1) * Number(limit));
    
                // Get total count of books for pagination metadata
                const totalCount = await Books.countDocuments(query);
    
                res.status(200).json({
                    books,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalCount / Number(limit))
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
    }   

    //create book
    postBook = async (req:Request ,res:Response) => {
        console.log("before create");
        const { title, price, description, ISBN, author , category} = req.body;
        // const authorId = req.user.authorId; // Assuming the authorId is stored in req.user.authorId

            // Validate input
            if (!title || !price || !description || !ISBN || !author || !category) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
         

        const newBook = await Books.create(req.body);
        res.status(201).json(newBook);
        console.log("Book added successfully:", newBook);
        console.log("book added");
        
    }
    //delete all books 
    // removeBook = async (req:Request ,res:Response) =>{
    //     const book = await Books.deleteMany();
    //     res.status(200).json(book)
    //     console.log(book);
    // }

    updateBookByAuthors = async (req: Request, res: Response) => {
        const { id } = req.params; // Get book ID from request params
        const { authorId } = req.body; 
        const book = await Books.findById(id);
        try {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            // Check if the author of the book matches the authenticated author
            if(book.author.toString() == authorId){
                let newBook = await Books.findByIdAndUpdate(id, req.body)
                return res.status(200).json({ message: 'Book updated successfully', newBook });
            }
            res.status(201).json({message: "Not Authorized To update"})

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    deleteBookByAuthor = async (req: Request, res: Response)=> {
        const { id } = req.params; // Get book ID from request params
        const { authorId } = req.body; 
        const book = await Books.findById(id);
        try {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            if (book.author.toString() == authorId) {
                const deletedBook = await Books.findByIdAndDelete(id, req.body)
                return res.status(200).json({messege: "Book deleted successfully", deletedBook})
            }
            return res.status(403).json({ message: 'You are not authorized to delete this book' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // //delete book by id 
    // deleteBookById = async (req:Request ,res:Response)  =>{
    //     const  { id }= req.params
    //     const book = await Books.findByIdAndDelete(id) 
    //     console.log(book);
    //     if(!book){
    //       return res.status(404).json({message: "Invalid Movie ID"})  // RETURN NEEDED HERE
    //     }
    //     res.status(200).json(book)
    // }
  
}