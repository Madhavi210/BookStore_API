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
exports.bookController = void 0;
const BookService_1 = require("../services/BookService");
const errorHelper_1 = require("../helper/errorHelper");
const obj = new errorHelper_1.ErrorClass;
const bookObj = new BookService_1.bookService();
class bookController {
    constructor() {
        this.getAllBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookObj.getAllBook(req, res);
            }
            catch (error) {
                const profileerror = obj.errorHelper(error);
            }
        });
        this.getBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookObj.getBookById(req, res);
            }
            catch (error) {
                const profileerror = obj.errorHelper(error);
            }
        });
        this.postBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookObj.postBook(req, res);
            }
            catch (error) {
                const profileerror = obj.errorHelper(error);
            }
        });
        this.removeBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookObj.removeBook(req, res);
            }
            catch (error) {
                const profileerror = obj.errorHelper(error);
            }
        });
        this.deleteBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookObj.deleteBookById(req, res);
            }
            catch (error) {
                const profileerror = obj.errorHelper(error);
            }
        });
    }
}
exports.bookController = bookController;
