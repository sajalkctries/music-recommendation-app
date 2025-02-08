// controllers/productController.js
import Product from '../models/productModel.js';
import fs from 'fs';
import Review from '../models/reviewModel.js';

// Add a new product
export const addProduct = async (req, res) => {
    const { name, artist, price, genre, releaseDate, duration, description } = req.body;
    const image_filename = req.file ? `${req.file.filename}` : '';  // Handle image filename

    try {
        const product = new Product({
            name,
            artist,
            price,
            image: image_filename,
            genre,
            releaseDate,
            duration,
            description,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');  // Populate reviews array
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        // Remove the product image from the file system
        fs.unlink(`uploads/${product.image}`, () => {});

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


