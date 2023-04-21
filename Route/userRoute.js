import express from 'express';
import { deleteUser, getUser } from '../Controller/userController.js';
import { verifyjson } from '../middleware/jw.js';

const route = express.Router();
route.delete('/delete/:id',verifyjson, deleteUser);
route.get('/get/:id', getUser);
export default route;