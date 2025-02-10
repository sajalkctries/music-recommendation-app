import User from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        // Update cart quantity
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await User.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Item added to cart", cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart", error });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        if (cartData[itemId]) {
            delete cartData[itemId]; // Remove the item
            await User.findByIdAndUpdate(userId, { cartData });
            return res.json({ success: true, message: "Item removed from cart", cartData });
        }

        res.status(400).json({ success: false, message: "Item not found in cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing item", error });
    }
};

// Fetch cart
const fetchCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart", error });
    }
};

export { addToCart, removeFromCart, fetchCart };
