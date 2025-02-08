// routes/productRoute.js
import express from 'express';
import multer from 'multer';
import { addProduct, getProducts } from '../controller/productController.js';

const productRouter = express.Router();

// Image storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

productRouter.post('/add', upload.single('image'), addProduct);
productRouter.get('/list', getProducts);

export default productRouter;
