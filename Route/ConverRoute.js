import express from 'express';
import { verifyjson } from '../middleware/jw.js';
import { createConversation, getConversations, getSingleConversation, updateConversation } from '../Controller/converController.js';

const routeConver = express.Router();

routeConver.get("/", verifyjson, getConversations);
routeConver.post("/", verifyjson, createConversation);
routeConver.get("/single/:id", verifyjson, getSingleConversation);
routeConver.put("/:id", verifyjson, updateConversation);

export default routeConver;