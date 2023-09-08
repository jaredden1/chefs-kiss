import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../../utilities/restaurant/restaurant-service";

export default function SearchResult({ searchResult, idx }) {
  const [name, setName] = useState("");
  const [display_phone, setDisplayPhone] = useState("");
  const [display_address0, setDisplayAddress0] = useState("");
  const [display_address1, setDisplayAddress1] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState();
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(searchResult.name);
    setDisplayPhone(searchResult.display_phone);
    setDisplayAddress0(searchResult.location.display_address[0]);
    setDisplayAddress1(searchResult.location.display_address[1]);
    setUrl(searchResult.url);
    setRating(searchResult.rating);
    setPrice(searchResult.price);
  }, [searchResult]);

  async function saveRestaurant() {
    await createRestaurant({
      name,
      display_phone,
      url,
      display_address0,
      display_address1,
      rating,
      price,
    });
    navigate("/");
  }

  return (
    <div className="search-card" key={`searchResults-${idx}`}>
      <h3>Name: {searchResult.name}</h3>
      <p>
        {" "}
        Categories:{" "}
        {searchResult.categories.map((category) => {
          return <>{" " + category.title + ","}</>;
        })}
      </p>
      <p> Phone: {searchResult.display_phone}</p>
      <p>
        {" "}
        Address: {searchResult.location.display_address[0] + "."}
        {" " + searchResult.location.display_address[1]}
      </p>
      <p> Rating: {searchResult.rating}</p>
      <p> Price: {searchResult.price}</p>

      <a href={searchResult.url}> See the Yelp Reviews </a>
      <button onClick={saveRestaurant}>Save this Restaurant</button>
    </div>
  );
}

//Refactor to drier code