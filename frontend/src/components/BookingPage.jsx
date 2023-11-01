import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../App";
import { toast } from "react-hot-toast";
import ShowPhotos from "./ShowPhotos";
import Loader from "./Loader";

const BookingPage = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [checkInDate, setCheckInDate] = useState(new Date(Date.now()));
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now()));
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [guests, setGuests] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [redirectToBookings, setRedirectToBookings] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/place/" + id)
      .then(({ data }) => {
        setPlace(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [id]);

  if (openModel) {
    return <ShowPhotos id={id} setOpenModel={setOpenModel} />;
  }

  const days = differenceInCalendarDays(
    new Date(checkOutDate),
    new Date(checkInDate)
  );

  const price = days * place?.price;

  const bookingHandeler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/new/booking/" + id,
        {
          name,
          email,
          phone,
          guests,
          checkInDate,
          checkOutDate,
          days,
          price,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data?.success) {
        setRedirectToBookings(true);
        // setRedirectToLogin(false);
        toast.success(data?.message);
      } else {
        // setRedirectToBookings(false);
        setRedirectToLogin(true);
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Error occured. Please try again later 🤧");
    }
  };

  if (redirectToBookings) {
    return <Navigate to={"/account/bookings"} />;
  }

  if (redirectToLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="p-0 px-5 md:p-4 md:px-20">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-semibold">{place?.title}</h1>

          {/* Address */}
          <div className="flex gap-2 items-center mt-5">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <a
              href={"https://maps.google.com/?q=" + place.address}
              target="blank"
            >
              {place.address}
            </a>
          </div>

          {/* Images */}
          {place?.photos?.length > 0 && (
            <>
              <div className="flex w-full justify-between gap-4 mt-5">
                <div className="w-full">
                  <img
                    src={"http://localhost:5000/uploads/" + place?.photos[0]}
                    alt=""
                    className=" rounded-l-2xl h-full object-cover"
                  />
                </div>

                <div className="w-full">
                  <div className=" w-full">
                    <img
                      src={"http://localhost:5000/uploads/" + place?.photos[3]}
                      alt=""
                      className="rounded-r-2xl object-cover mb-2"
                    />
                  </div>
                  <div className="w-full">
                    <img
                      src={"http://localhost:5000/uploads/" + place?.photos[2]}
                      alt=""
                      className="rounded-r-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <button
              onClick={() => {
                setOpenModel(true);
              }}
              className="primary flex gap-2 rounded-full p-2 mt-4"
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Show More Photos
            </button>
          </div>

          {/* Desctiption and other information */}
          <div className="flex mt-6 justify-between gap-5">
            <div className="w-full">
              <h1 className="text-xl font-semibold">Description</h1>
              <p>{place?.description}</p>
              <p>Check In: {place?.checkIn}</p>
              <p>Check Out: {place?.checkOut}</p>
              <p>Maxmum Number Guests: {place?.maxGuests}</p>
            </div>

            {/* Booking details */}
            <div className="w-1/2 border rounded-2xl shadow-xl p-3">
              <h1 className="text-3xl text-center">
                Price: ${place?.price}/ per night
              </h1>

              {/* Booking Info */}
              <div className="mt-5 border rounded-2xl">
                {/* Date */}
                <div className="flex flex-col lg:flex-row justify-between border-b rounded-2xl">
                  <div className="w-full p-2 border-r">
                    {/* check in date */}
                    <h1>Check In Date</h1>
                    <input
                      type="date"
                      name="checkIn"
                      id="checkIn"
                      value={checkInDate}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="w-full p-2">
                    {/* check out date */}
                    <h1>Check Out Date</h1>
                    <input
                      type="date"
                      name="checkOut"
                      id="checkOut"
                      value={checkOutDate}
                      onChange={(e) => {
                        setCheckOutDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                {/* information about the person */}

                {days > 0 && (
                  <div className="p-2">
                    <form onSubmit={bookingHandeler}>
                      <div>
                        <h1 className="font-semibold">Enter Your Name:</h1>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold">Enter Your Email:</h1>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold">
                          Enter Your Phone Number:
                        </h1>
                        <input
                          type="number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold">Number of Guests</h1>
                        <input
                          type="number"
                          value={guests}
                          onChange={(e) => {
                            setGuests(e.target.value);
                          }}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className=" w-full primary"
                        disabled={guests > place?.maxGuests ? true : false}
                      >
                        Book now for {days} days ${days * place?.price}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Extra info */}
          <div>
            <h1 className="text-xl font-semibold mt-5">Description</h1>
            <p className="text-gray-600">{place?.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingPage;
