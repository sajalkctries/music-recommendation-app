import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

const frontend_url = "http://localhost:5173/";

//place order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "npr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 140,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "npr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100 * 140,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderIf${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderIf${newOrder._id}`
    });
    res.json({success:true,session_url:session.url})
  } catch (error) {res.json({success:false,message:error})}
};

export { placeOrder };
