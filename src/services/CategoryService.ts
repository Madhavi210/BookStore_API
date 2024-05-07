import  {Category as ImportedCategory}  from '../models/Category';
import express , {Request,Response} from 'express';



export class categoryService {
    postCategory = async (req:Request ,res:Response) => {
        const category = await ImportedCategory.create(req.body);
        res.status(200).json(category);
        console.log(category);
    }


    getAllCategory = async(req:Request, res:Response) => {
        //     const category = await ImportedCategory.find();
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalDocuments = await ImportedCategory.countDocuments();
        const category = await ImportedCategory.find().skip(startIndex).limit(limit);

        // Pagination result
        const pagination: { [key: string]: { page: number, limit: number } } = {};

        if (endIndex < totalDocuments) {
            pagination['next'] = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            pagination['prev'] = {
                page: page - 1,
                limit: limit
            };
        }

        console.log(category);
        res.status(200).json({ message: "category", category, pagination });
    
    }

    deleteUserById = async(req:Request, res:Response) => {
            const {id} = req.params;
            const deletedCategory = await ImportedCategory.findByIdAndDelete(id);
            res.status(200).json(deletedCategory);
    }

    getById = async(req:Request, res:Response) => {
            const {id} = req.params;
            const category =  await ImportedCategory.findById(id);
            res.status(200).json(category)
    }

    updateUser = async(req:Request, res:Response) => {
            const {id} = req.params;
            const category = await ImportedCategory.findByIdAndUpdate(id, req.body, {new:true});
            res.status(200).json(category)
    }

}


