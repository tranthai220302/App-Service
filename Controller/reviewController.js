import Gig from "../Models/Gig.js";
import Review from "../Models/Review.js"
import createError from "../ultis/createError.js"

export const createReview = async(req, res, next) =>
{
    if(req.isSeller)
    {
        return next(createError(404, "Bạn không thể đánh giá gig này vì bạn là Seller!"));
    }
    const newReview = Review({
        userId: req.id,
        gigId : req.body.gigId,
        desc : req.body.desc,
        star : req.body.star,
    })
    try {
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.id,
        })
        if(review)
        {
            return next(createError(404, "Bạn đã đánh giá gig này!"));
        }

        const saveReview = await newReview.save();
        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: { totalStars: req.body.star, starNumber: 1 },
          });
        res.send(saveReview);
    } catch (error) {
        next(error);
    }
}

export const getReview = async(req, res, next) =>
{
    try {
        const reviews = await Review.find({ gigId: req.params.id });
        console.log(reviews);
        res.status(200).send(reviews);
      } catch (err) {
        next(err);
      }
}

export const deleteReview = ()=>
{

}