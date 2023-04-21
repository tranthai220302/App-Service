import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from "../ultis/createError.js";
import { info } from "console";
import { NONAME } from "dns";
export const loginCotroller = async(req, res, next) =>
{   
    try {
        console.log(req.body);
        const userLogin = await User.findOne({username : req.body.username});
        if(!userLogin){
            return next(createError(500, "Tài khoản không chính xác"));
        }else{
            const isPass = bcrypt.compareSync(req.body.password, userLogin.password);
            if(!isPass)
            {
                return next(createError(500, "Mật khẩu không chính xác"));
            }
            const {password, ...info} = userLogin._doc;
            const token = jwt.sign({
                id: userLogin._id,
                isSeller: userLogin.isSeller,
            }, process.env.KEY_JWT);
    
            res.cookie("accessToken", token, {
                httOnly: true,
            }).status(200).send(info);
        }
    } catch (error) {
        next(error);
    }
}
export const register = async(req, res, next) =>
{
    try {
        const hassPassword = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hassPassword,
        });
        await newUser.save();
        res.status(200).send("Đăng ký thành công");
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) =>
{
    try {
        res.clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        }).status(200).send("Đăng xuất thành công!");
    } catch (error) {
        next(error);
    }
}