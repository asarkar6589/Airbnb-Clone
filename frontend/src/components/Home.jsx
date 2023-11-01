import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/all-places")
      .then(({ data }) => {
        setLoading(false);
        setPlaces(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <div className="flex p-4 px-7 gap-7 flex-wrap justify-between mt-12">
      {loading ? (
        <Loader />
      ) : (
        <>
          {places.length > 0 &&
            places.map((place, index) => {
              return (
                <Link
                  to={"/booking/" + place._id}
                  className="flex flex-col justify-center items-center border-black-500 w-96"
                  id={index}
                >
                  <div>
                    <img
                      src={"http://localhost:5000/uploads/" + place.photos[0]}
                      alt=""
                      className="h-80 w-full rounded-2xl object-fit"
                      // className="rounded-2xl object-cover aspect-square"
                    />
                  </div>

                  <div>
                    <h1 className="text-xl font-semibold">{place.title}</h1>
                  </div>

                  <div>{place.address}</div>

                  <div className="font-bold">${place.price} per night</div>
                </Link>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Home;
