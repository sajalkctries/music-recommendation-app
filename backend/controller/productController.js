import Product from '../models/productModel.js';
import fs from 'fs';
import Review from '../models/reviewModel.js';

// Add a new product
export const addProduct = async (req, res) => {
    const image_filename = req.file ? `${req.file.filename}` : '';  // Handle image filename

    // Destructure data from req.body
    const { name, artist, price, genres, releaseYear, duration, description } = req.body;

    try {
        // Check if genres is a string and parse it to an array if necessary
        const parsedGenres = typeof genres === 'string' ? JSON.parse(genres) : genres;

        const product = new Product({
            name,
            artist,
            price,
            image: image_filename,
            genre: parsedGenres,  // Ensure genres is an array
            releaseYear,
            duration,
            description,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error("error:", error);
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
