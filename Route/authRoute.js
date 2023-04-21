import express from 'express';
import { loginCotroller, logout, register } from '../Controller/authController.js';
const route = express.Router();

route.post("/login", loginCotroller);
route.post("/register", register);
route.post('/logout', logout);
route.post('/h', (req, res)=>{
    res.send("helo");
})
export default route;