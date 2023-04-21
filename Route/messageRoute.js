import express from 'express';
import { createMessage, getMessages } from '../Controller/messageController.js';
import { verifyjson } from '../middleware/jw.js';
const routeMessage = express.Router();

routeMessage.post("/", verifyjson, createMessage);
routeMessage.get("/:id", verifyjson, getMessages);
export default routeMessage;