import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

const ADMIN_URL = "http://localhost:4000/api/order"; // Update with your API URL

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${ADMIN_URL}/all`);
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${ADMIN_URL}/update-status`, {
        orderId,
        status,
      });
      if (response.data.success) {
        toast.success("Order status updated!");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`${ADMIN_URL}/delete/${orderId}`);
      if (response.data.success) {
        toast.success("Order deleted successfully!");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">{order.userId.name}</td> {/* Accessing userId.username */}
                <td className="px-4 py-2">Rs {order.amount}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;
