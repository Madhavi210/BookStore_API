import { logoutMiddleware } from './../utils/logoutMiddleware';
import { AuthorLoginMiddleware } from '../utils/authMiddleware';
import { authorController } from './../controllers/AuthorController';
import express, {Request,Response  } from "express";

const router = express.Router();
const AuthorController = new authorController();
const authorLoginMiddleware = new AuthorLoginMiddleware();
const LogoutMiddleware = new logoutMiddleware();

router.post('/login/author', authorLoginMiddleware.loginMiddlewareAuthor,authorLoginMiddleware.loginAuthor)
router.post('/post',AuthorController.createAuthor);
router.get('/:id',AuthorController.getAuthorById);
router.put('/update/:id',authorLoginMiddleware.isLoggedInAuthor, AuthorController.updateAuthor)
router.delete('/delete/:id', AuthorController.deleteAuthor);
router.post('/logout/:userId',authorLoginMiddleware.isLoggedInAuthor, LogoutMiddleware.logout);


export default router;
