import React, { useEffect, useState } from "react";
import Account from "./Account";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

const Accomodations = () => {
  const [places, setPlaces] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        setLoading(false);
        setPlaces(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [count]);

  const deletePlace = async (id) => {
    try {
      const { data } = await axios.delete("/delete/" + id);
      toast.success(data.message);
      setCount(count + 1);
    } catch (error) {
      toast.error(`Error Occured`);
    }
  };
  return (
    <div className="p-4 px-7">
      <Account />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center mt-5 flex-col">
            <Link
              to={"/account/accomodations/new"}
              className="bg-primary p-2 text-white rounded-2xl flex justify-center items-center px-4 w-1/5 mb-12 gap-2 w-full md:w-1/6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add Place
            </Link>

            {/* Places */}
            <div>
              {places?.length > 0 &&
                places.map((place, index) => {
                  return (
                    <div id={place} className="relative">
                      <Link
                        to={"/account/accomodations/" + place._id}
                        id={index}
                        className="flex flex-col md:flex-row items-center gap-7 shrink grow-0 mb-4 object-contain bg-gray-200 shadow-xl rounded-2xl p-4 mb-10 w-full"
                      >
                        <div>
                          <img
                            src={`http://localhost:5000/uploads/${place.photos[0]}`}
                            alt=""
                            className="h-40 w-full rounded-2xl object-cover grow shrink-0"
                          />
                        </div>

                        <div className="flex-col relative w-full">
                          <div>
                            <h1 className="text-2xl font-semibold mb-2">
                              {place.title}
                            </h1>
                          </div>
                          <div className="mb-2">{place.description}</div>
                        </div>
                      </Link>
                      <button
                        className="bg-transparent border-none absolute right-8 -mt-20 -mb-2"
                        onClick={() => {
                          deletePlace(place._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Accomodations;
