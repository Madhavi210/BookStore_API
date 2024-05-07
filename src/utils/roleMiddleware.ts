import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from './jwtUtils';
import { AuthorLoginMiddleware } from './authMiddleware';


export class roleMiddleware {
    static isAuthor (req: Request, res: Response, next: NextFunction) {
        // Check if the user is an author
        const {role} = req.body;
        if (role === 'author') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized: Author access required' });
        }
    };

    static isAdmin (req: Request, res: Response, next: NextFunction)  {
        // Check if the user is an admin
        const {role} = req.body;
        if (role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }
    };
}