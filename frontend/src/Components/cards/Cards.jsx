import { Link } from "react-router-dom";
import { record_list } from "../../assets/assets";
import Card from "./Card";

function Cards() {
  return (
    <div className="grid place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-5 md:px-10">
      {record_list.map((item) => (
        <Link key={item._id} to={`/product/${item._id}`}>
          <Card
            key={item._id}
            _id={item._id}
            name={item.name}
            artist={item.artist}
            image={item.image}
            price={item.price}
            // description={item.description}
            genre={item.genre}
            releaseDate={item.releaseDate}
            duration={item.duration}
            ratings={item.ratings}
            numberOfRatings={item.numberOfRatings}
          />
        </Link>
      ))}
    </div>
  );
}

export default Cards;
