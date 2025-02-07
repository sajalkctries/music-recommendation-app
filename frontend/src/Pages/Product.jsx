import { useParams } from "react-router-dom";
import { record_list } from "../assets/assets";
import { useState } from "react";

const Product = () => {
  const { id } = useParams();
  const product = record_list.find((item) => item._id === id);
  const [cart, setCart] = useState([]);

  if (!product) {
    return <div className="text-center text-xl mt-10">Product not found.</div>;
  }

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  console.log(cart)
  return (
    <div className="max-w-4xl mx-auto p-6  bg-white rounded-2xl">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <h2 className="text-xl text-gray-600">by {product.artist}</h2>

      <div className="mt-4 flex gap-6 flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
        />
<div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkka
  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkka
</div>
        <div>   
          <p className="text-lg font-semibold text-gray-800">Price: Rs {product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Release Date:</strong> {product.releaseDate} <br />
            <strong>Duration:</strong> {product.duration} mins
          </p>

          <div className="mt-4">
            <strong>Genre:</strong>
            <ul className="list-disc ml-5 text-gray-700">
              {product.genre.map((g, index) => (
                <li key={index}>{g}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-lg">
              ⭐ {product.ratings} / 5 ({product.numberOfRatings} reviews)
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="mt-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b py-3">
                <p className="font-semibold">{review.user}</p>
                <p>⭐ {review.rating} / 5</p>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
