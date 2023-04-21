import express from 'express';
import { createOrder, getOrders } from '../Controller/oderController.js';
import { verifyjson } from '../middleware/jw.js';
const routeOrder = express.Router();
routeOrder.post('/createOrder/:id', verifyjson, createOrder);
routeOrder.get('/',verifyjson, getOrders);

export default routeOrder;