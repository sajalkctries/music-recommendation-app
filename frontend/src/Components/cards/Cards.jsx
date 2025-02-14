import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

function Cards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products/list");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  
if(!data){
  return <div>Server Down</div>
}
  return (
    <div className="grid place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-5 md:px-10">
      {data.map((item) => (
        <Link key={item._id} to={`/product/${item._id}`}>
          <Card
            _id={item._id}
            name={item.name}
            artist={item.artist}
            image={item.image}
            price={item.price}
            genre={item.genre}
            releaseYear={item.releaseYear}
            duration={item.duration}
            rating={item.rating}
            numberOfRatings={item.numberOfRatings}
          />
        </Link>
      ))}
    </div>
  );
}

export default Cards;
