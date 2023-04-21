import User from "../Models/User.js";
import createError from "../ultis/createError.js";

export const deleteUser = async(req, res, next)=>
{
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(createError(404, "Người dùng không tồn tại"));
    }
    if(user._id.toString() !== req.id)
    {
        return next(createError(404, "Bạn chỉ có thể xoá tài khoản của chính mình!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Xoá thành công");
}

export const getUser = async(req, res, next)=> 
{
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(createError(404, "Người dùng không tồn tại!"));
    }
    res.status(200).send(user);
}