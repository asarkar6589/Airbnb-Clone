import React, { useEffect, useState } from "react";
import Account from "./Account";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/bookings")
      .then(({ data }) => {
        setLoading(false);
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Account />

      <div className="p-4 px-7">
        {loading ? (
          <Loader />
        ) : (
          <>
            {bookings?.length > 0 &&
              bookings.map((booking, index) => {
                return (
                  <Link
                    to={"/account/booking/" + booking._id}
                    key={index}
                    className="bg-gray-200 rounded-2xl flex flex-col justify-center items-center md:flex-row md:justify-start gap-6 mt-4 shadow-xl p-4"
                  >
                    <div>
                      <img
                        src={"http://localhost:5000/uploads/" + booking?.photo}
                        alt={booking?.placeName}
                        className="h-40 w-60 rounded-2xl"
                      />
                    </div>

                    {/* Information */}
                    <div>
                      {/* Name of the place */}
                      <div className="mt-3">
                        <h1 className="text-xl font-semibold">
                          {booking?.placeName}
                        </h1>
                      </div>

                      {/* Nights and date */}
                      <div className="text-gray-700 flex mt-2 flex-col md:flex-row gap-2 items-center md:mt-5  text-2xl">
                        {/* Nights */}
                        <div className="flex gap-1 items-center">
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
                              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                          </svg>
                          <span>{booking?.days} Nights </span>
                        </div>

                        {/* date */}
                        <div className="flex items-center">
                          {/* check in */}
                          <div className="flex flex-col md:flex-row gap-2 items-center">
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
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                            <span>{booking?.checkIn?.split("T")[0]} -&gt;</span>
                          </div>

                          {/* check out */}
                          <div className="flex flex-col md:flex-row gap-2 ml-2 items-center">
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
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                            <span>{booking?.checkOut?.split("T")[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex justify-center md:justify-start gap-2 mt-5 text-2xl items-center">
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
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>

                        <span>Total Price: ${booking?.price}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
