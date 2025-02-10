import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Delivering" },
    Date: { type: Date, default: Date.now }, // Remove () from Date.now
    Payment: { type: Boolean, default: false },
    address: { type: String, required: true } // Added missing type
});

const Order = mongoose.model("order", orderSchema);

export default Order;
