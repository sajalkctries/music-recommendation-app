import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Components/Context/StoreContext";



const BACKEND_URL = "http://localhost:5000/api/order/place";

function PlaceOrder() {
  const { cart, username, token, clearCart } = useContext(StoreContext);
  const [address, setAddress] = useState("");

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !username || Object.keys(cart).length === 0) {
      alert("Please fill all fields and add items to cart.");
      return;
    }

    try {
      const response = await axios.post(
        BACKEND_URL,
        {
          userId: username,
          items: Object.entries(cart).map(([id, item]) => ({
            id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          amount: totalAmount + 2, // Adding Rs 2 delivery charge
          address,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        clearCart(); // Clear cart after order placement
        window.location.href = response.data.session_url; // Redirect to Stripe Checkout
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Order failed. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Place Your Order</h2>

      {/* Address Input with Google Maps Autocomplete */}
      <label className="block font-medium mb-1">Delivery Address</label>
      <input type="text" className="border-2 border-black" onChange={(e)=>setAddress(e.target.value)} />

      <h3 className="font-semibold mb-2">Order Summary</h3>
      <ul className="border p-3 rounded-md mb-4">
        {Object.entries(cart).map(([id, item]) => (
          <li key={id} className="flex justify-between py-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>Rs {item.price * item.quantity}</span>
          </li>
        ))}
        <li className="flex justify-between font-semibold pt-3 border-t">
          <span>Delivery Charge</span>
          <span>Rs 2</span>
        </li>
        <li className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs {totalAmount + 2}</span>
        </li>
      </ul>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrder;