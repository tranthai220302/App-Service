import express from 'express';
import { createReview, getReview } from '../Controller/reviewController.js';
import { verifyjson } from '../middleware/jw.js';

const routeReview = express.Router();

routeReview.post('/createReview', verifyjson, createReview);
routeReview.get('/get/:id', getReview);

export default routeReview;