import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    email : {
        type: String,
        require: true,
        unique: true,
    },
    img : {
        type: String, 
        require: false,
    },
    country : {
        type: String,
        require: false,
    },
    phone : {
        type: String,
        require: false,
    },
    desc : {
        type: String,
        require: false,
    },
    isSeller : {
        type: Boolean,
        require: false,
    },
}, 
    {timestamps : true}
)

export default mongoose.model("User", UserSchema);