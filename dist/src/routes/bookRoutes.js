"use strict";
// import { bookController, bookController } from './../controllers/BookController';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../controllers/BookController");
const router = express_1.default.Router();
const BookController = new BookController_1.bookController();
router.get('/getAll', BookController.getAllBook);
router.get('/:id', BookController.getBookById);
router.post('/post', BookController.postBook);
router.delete('/delete/', BookController.removeBook);
router.delete('/delete/:id', BookController.deleteBookById);
exports.default = router;
