import { AuthorLoginMiddleware } from '../utils/authMiddleware';
import { roleMiddleware } from '../utils/roleMiddleware';
import { categoryController } from './../controllers/CategoryController';
import express, {Request,Response  } from "express";

const router = express.Router();
const CategoryController = new categoryController();
const authorLoginMiddleware = new AuthorLoginMiddleware();
const RoleMiddleware = new roleMiddleware();

router.get('/getAll' ,CategoryController.getAllCategory);
router.get('/:id',CategoryController.getCategoryById);
router.post('/add',authorLoginMiddleware.isLoggedInAdmin, CategoryController.postCategory);
router.delete('/delete/:id' ,authorLoginMiddleware.isLoggedInAdmin, CategoryController.deleteCategoryById);

export default router;
