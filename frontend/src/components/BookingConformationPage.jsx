import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ShowPhotos from "./ShowPhotos";

const BookingConformationPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [place, setPlace] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get("/booking/" + id)
      .then(({ data }) => {
        if (data.success) {
          // console.log(data);
          setBooking(data.booking);
          setPlace(data.place);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [id]);

  if (openModel) {
    return <ShowPhotos id={place._id} setOpenModel={setOpenModel} />;
  }

  const deleteBookingHandeler = async () => {
    try {
      const { data } = await axios.delete("/booking/" + id);

      toast.success(data.message);

      setRedirect(true);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }
  return (
    <div className="p-4 px-20">
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
        <a href={"https://maps.google.com/?q=" + place.address} target="blank">
          {place.address}
        </a>
      </div>

      {/* Booking Details */}
      <div className="bg-gray-200 rounded-2xl p-12 mt-5 flex flex-col lg:flex-row justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">
            Your Booking Information
          </h1>

          {/* Information */}
          <div className="text-gray-700 flex flex-col lg:flex-row gap-2 items-center mt-5  text-2xl">
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
              <span>{booking?.days} Nights : </span>
            </div>

            {/* date */}
            <div className="flex items-center">
              {/* check in */}
              <div className="flex text-sm lg:text-2xl flex-col lg:flex-row gap-2 items-center">
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
              <div className="flex flex-col text-sm lg:text-2xl lg:flex-row gap-2 ml-2 items-center">
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
        </div>

        {/* Price */}
        <div className="text-3xl p-2 rounded-2xl lg:rounded-3xl bg-red-500 text-white lg:p-4 flex justify-center items-center cursor-pointer mb-4 mt-7 lg:mb-0 lg:mt-7">
          Total Price : ${booking?.price}
        </div>

        {/* Cancelation */}
        <button
          className="text-3xl p-2 rounded-2xl lg:rounded-3xl bg-red-500 text-white lg:p-4 flex justify-center items-center cursor-pointer mb-4 mt-7 lg:mb-0 lg:mt-7"
          onClick={() => {
            deleteBookingHandeler();
          }}
        >
          Cancel Booking?
        </button>
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
      </div>

      {/* Extra info */}
      <div>
        <h1 className="text-xl font-semibold mt-5">Description</h1>
        <p className="text-gray-600">{place?.description}</p>
      </div>
    </div>
  );
};

export default BookingConformationPage;
