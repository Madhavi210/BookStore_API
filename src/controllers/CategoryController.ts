
import { categoryService as CategoryService} from '../services/CategoryService';
import express, {Request, Response} from 'express'
import { ErrorClass } from '../helper/errorHelper'


const obj = new ErrorClass;
const categoryObj = new CategoryService();

export class categoryController{
    getAllCategory = async(req:Request, res:Response) =>{
        try {
            await categoryObj.getAllCategory(req,res)
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getCategoryById = async(req:Request, res:Response) => {
        try {
            await categoryObj.getById(req,res)
        } catch (error) {
            const profileerror = obj.errorHelper(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    postCategory = async(req:Request, res:Response) => {
        try {
            await categoryObj.postCategory(req, res);
            console.log("category added from controller");
            
        } catch (error) {
            console.log(error);
            // res.status(500).json({ error: 'Internal Server Error' });
            // const profileerror = obj.errorHelper(error)


        }
    }
    
     deleteCategoryById = async(req:Request, res:Response) => {
        try {
            await categoryObj.deleteUserById(req, res)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            const profileerror = obj.errorHelper(error);
        }
    }
    
}

