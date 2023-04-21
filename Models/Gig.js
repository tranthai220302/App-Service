import mongoose, { Schema } from "mongoose";

const gigSchema = new Schema({
    idUser : {
        type: String,
        require: true,
    },

    title : {
        type: String,
        require: true,
    },
    desc : {
        type: String,
        require: true,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber : {
        type: Number,
        default: 0,
    },
    cat: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    cover: {
        type: String,
        require: true,
    },
    imgs: {
        type: [String],
        require: false,
    },
    shortTitle: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    revisionNumber: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: false,
    },
    sales: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    }
)
export default mongoose.model("Gig", gigSchema);