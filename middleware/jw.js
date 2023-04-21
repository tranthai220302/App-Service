import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import createError from '../ultis/createError.js';

export const verifyjson = (req, res, next)=>
{
    try {
        const token = req.cookies.accessToken;
        if(!token){
            return next(createError(404, "Token is not valid"));
        }
        jwt.verify(token, process.env.KEY_JWT, async(err, payload)=>
        {
            if(err)
            {
                return next(createError(404, "Token is not valid"));
            }
            req.id = payload.id;
            req.isSeller = payload.isSeller;
            next();
        })
    } catch (error) {
        next(error);
        console.log(error);
        console.log("hiii");
    }
}