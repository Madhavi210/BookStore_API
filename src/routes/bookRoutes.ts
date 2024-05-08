

import express, {Request,Response  } from "express";
import { bookController } from "../controllers/BookController";
import { roleMiddleware } from "../utils/roleMiddleware";
import { AuthorLoginMiddleware } from "../utils/authMiddleware";
import {AdminLoginMiddleware} from '../utils/adminMiddleware'

const router = express.Router();
const BookController = new bookController();
const authorLoginMiddleware = new AuthorLoginMiddleware();
const RoleMiddleware = new roleMiddleware();
const adminLoginMiddleware = new AdminLoginMiddleware();

router.post('/login/admin', adminLoginMiddleware.loginMiddlewareAdmin, adminLoginMiddleware.loginAdmin)
router.get('/getAll', BookController.getAllBook);
router.get('/:id',BookController.getBookById);
router.post('/add', authorLoginMiddleware.isLoggedInAuthor , BookController.postBooks);
router.post('/add', adminLoginMiddleware.isLoggedInAdmin , BookController.postBooks);
// router.delete('/delete/',  BookController.removeBook);
router.delete('/delete/:id',adminLoginMiddleware.isLoggedInAdmin ,BookController.deleteBookById);

//admin access



export default router;
