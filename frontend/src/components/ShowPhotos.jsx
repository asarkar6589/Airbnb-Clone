import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const ShowPhotos = ({ id, setOpenModel }) => {
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/place/" + id)
      .then(({ data }) => {
        setPlace(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  return (
    <div className="flex flex-col justify-center items-center">
      <>
        <button
          className="primary mb-7 mt-7 flex gap-2 px-2 w-60 justify-center items-center"
          onClick={() => {
            setOpenModel(false);
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
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Close
        </button>

        <div className="flex flex-wrap gap-2 justify-around p-4 px-7">
          {loading ? (
            <Loader />
          ) : (
            <>
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow-2xl shadow-gray-500 rounded-2xl h-80"
                    >
                      <img
                        src={"http://localhost:5000/uploads/" + photo}
                        className="w-full h-80 mb-7 object-fit rounded-2xl"
                      />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default ShowPhotos;
