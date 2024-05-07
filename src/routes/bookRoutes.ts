

import express, {Request,Response  } from "express";
import { bookController } from "../controllers/BookController";
import { roleMiddleware } from "../utils/roleMiddleware";
import { AuthorLoginMiddleware } from "../utils/authMiddleware";


const router = express.Router();
const BookController = new bookController();
const authorLoginMiddleware = new AuthorLoginMiddleware();
const RoleMiddleware = new roleMiddleware();

router.post('/login/admin', authorLoginMiddleware.loginMiddlewareAdmin, authorLoginMiddleware.loginAdmin)
router.get('/getAll', BookController.getAllBook);
router.get('/:id',BookController.getBookById);
router.post('/add', authorLoginMiddleware.isLoggedInAuthor , BookController.postBooks);
router.post('/add', authorLoginMiddleware.isLoggedInAdmin , BookController.postBooks);
// router.delete('/delete/',  BookController.removeBook);
router.delete('/delete/:id',authorLoginMiddleware.isLoggedInAdmin ,BookController.deleteBookById);

//admin access





export default router;
