import { AuthorLoginMiddleware } from '../utils/authMiddleware';
import { roleMiddleware } from '../utils/roleMiddleware';
import { categoryController } from './../controllers/CategoryController';
import express, {Request,Response  } from "express";
import {AdminLoginMiddleware} from '../utils/adminMiddleware'

const router = express.Router();
const CategoryController = new categoryController();
const authorLoginMiddleware = new AuthorLoginMiddleware();
const RoleMiddleware = new roleMiddleware();
const adminLoginMiddleware = new AdminLoginMiddleware();


router.get('/getAll' ,CategoryController.getAllCategory);
router.get('/:id',CategoryController.getCategoryById);
router.post('/add',adminLoginMiddleware.isLoggedInAdmin, CategoryController.postCategory);
router.delete('/delete/:id' ,adminLoginMiddleware.isLoggedInAdmin, CategoryController.deleteCategoryById);

export default router;
