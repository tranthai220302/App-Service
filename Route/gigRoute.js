import express from 'express';
import { verifyjson } from '../middleware/jw.js';
import { createGig, deleteGig, getGig, getGigs } from '../Controller/gigController.js';

const routeGig = express.Router();

routeGig.post('/createGig', verifyjson, createGig);
routeGig.delete('/deleteGig/:id', verifyjson, deleteGig);
routeGig.get('/get/:id', getGig);
routeGig.get('/', getGigs);

export default routeGig;