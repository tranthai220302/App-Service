import Gig from "../Models/Gig.js"
import Order from "../Models/Order.js"

export const createOrder = async(req, res, next)=>
{
try {
    const gig = await Gig.findById(req.params.id);
    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.id,
        sellerId: gig.idUser,
        price: gig.price, 
        payment_intent: "temporary"
    });
    await newOrder.save();
    res.send("Successfull");
} catch (error) {
    next(error);
}
}

export const getOrders = async (req, res, next)=>
{
    try {
        const orders = await Order.find({
          ...(req.isSeller ? { sellerId: req.id } : { buyerId: req.id }),
          isCompleted: true,
        });
    
        res.status(200).send(orders);
      } catch (err) {
        next(err);
      }
}