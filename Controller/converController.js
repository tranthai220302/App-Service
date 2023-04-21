import createError from "../ultis/createError.js";
import Conversation from "../Models/Conversation.js";
export const createConversation = async(req, res, next)=>
{
    const Conversation_new =  new Conversation({
        id : req.isSeller ? req.id + req.body.to : req.body.to + req.id,
        sellerId : req.isSeller ? req.id : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.id,
        readBySeller : req.isSeller ? true : false ,
        readByBuyer: req.isSeller ? false : true
    });
    try {
        const conver = await Conversation_new.save();
        res.status(200).send(conver)
    } catch (error) {
        next(error)
    }
}

export const updateConversation = async (req, res, next)=>
{
    idUpdate = req.params.id;
    try {
        const updateConversation = await Conversation.findByIdAndUpdate({
            id: idUpdate},
            {
                $set :{
                    ...(req.isSeller ? {readBySeller: true} : {readByBuyer: true})
                }
            },
            {new : true}
            );
            res.status(200).send(updateConversation)
    } catch (error) {
        next(error)
    }
}

export const getSingleConversation = async (req, res, next)=>
{
    try {
        const conversation = await Conversation.findOne({ id: req.params.id });
        if (!conversation) return next(createError(404, "Not found!"));
        res.status(200).send(conversation);
      } catch (err) {
        next(err);
      }
}
export const getConversations = async (req, res, next) => {
    try {
        console.log("cccccccccccccccccccc")
      const conversations = await Conversation.find(
        req.isSeller ? { sellerId: req.id } : { buyerId: req.id }
      ).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
    } catch (err) {
      next(err);
    }
  };