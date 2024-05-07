"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const Book_1 = require("./../models/Book");
// import Books from '../models/Book'
class bookService {
    constructor() {
        //get book by id
        this.getBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const book = yield Book_1.Books.findById(id);
            res.status(200).json(book);
            console.log(book);
        });
        //get all books 
        this.getAllBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Books.find({});
            res.status(200).json(book);
        });
        //create book
        this.postBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield Book_1.Books.create(req.body);
            res.status(200).json(Book_1.Books);
            console.log(Book_1.Books);
        });
        //delete all books 
        this.removeBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Books.deleteMany();
            res.status(200).json(book);
            console.log(book);
        });
        //delete book by id 
        this.deleteBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const book = yield Book_1.Books.findByIdAndDelete(id);
            console.log(book);
            if (!book) {
                return res.status(404).json({ message: "Invalid Movie ID" }); // RETURN NEEDED HERE
            }
            res.status(200).json(book);
        });
    }
}
exports.bookService = bookService;
