// routes/reviewRoute.js
import express from 'express';
import { addReview, getProductReviews } from '../controller/reviewController.js';
import authMiddleware from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', addReview);
reviewRouter.get('/product/:productId', getProductReviews);

export default reviewRouter;
