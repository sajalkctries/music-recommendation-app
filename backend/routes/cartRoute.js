import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { addToCart,removeFromCart,fetchCart } from '../controller/cartController.js'


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/fetch",authMiddleware,fetchCart);

export default cartRouter;