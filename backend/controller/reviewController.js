// controllers/reviewController.js
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';

// Add a new review
export const addReview = async (req, res) => {
    const { productId, userId, rating, comment } = req.body;

    try {
        // Create a new review
        const review = new Review({
            productId,
            userId,
            rating,
            comment,
        });

        await review.save();

        // Update product with new rating (optional)
        const product = await Product.findById(productId);
        product.reviews.push(review);
        product.numberOfRatings += 1;
        product.rating = (product.rating * (product.numberOfRatings - 1) + rating) / product.numberOfRatings;
        await product.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get reviews for a specific product
export const getProductReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
