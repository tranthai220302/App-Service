import Gig from "../Models/Gig.js";
import createError from "../ultis/createError.js";
export const createGig = async(req, res, next)=>
{

    if(!req.isSeller)
    {
        return next(createError(404, "Bạn không có quyền tạo Gig!"));
    }

    const newGig = new Gig({
        ...req.body,
        idUser: req.id
    })
    try {
        await newGig.save();
        res.status(200).send("Đăng ký thành công!");
    } catch (error) {
        next(error);
    }
}

export const deleteGig = async(req, res, next) =>
{
    const gitDelete = await Gig.findById(req.params.id);
    if(gitDelete.idUser !== req.id)
    {
        return next(createError(404, "Bạn chỉ có thể xoá gig của bản thân!"));
    }
    try {
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Xoá thành công!");
    } catch (error) {
        next(error);
    }
}
export const getGig = async(req, res, next) =>
{
    try {
        const git = await Gig.findById(req.params.id);
        res.status(200).send(git);
    } catch (error) {
        next(error);
    }
}

export const getGigs = async(req, res)=>
{
    const q = req.query;
    const filter = {
        ...(q.userId && {idUser : q.userId}),
        ...(q.cat && {cat : q.cat}),
        ...((q.min || q.max) && {
        price : {
            ...(q.min && {$gt : q.min}),
            ...(q.max && {$lt : q.max}),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
    }
    console.log(filter);
    try {
        const gigs = await Gig.find(filter).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
      } catch (err) {
        next(err);
      }
}