import React from "react";
import { Link, useLocation } from "react-router-dom";

const Account = () => {
  const { pathname } = useLocation();
  const activeLink = (design = null) => {
    let className =
      "flex flex-col items-center justify-center px-4 w-1/2 md:w-1/6 lg:flex-row gap-3 p-2 px-7 border rounded-2xl bg-gray-200 ";

    if (design == pathname) {
      className += "text-white bg-primary";
    }

    return className;
  };
  return (
    <div className="flex flex-col md:flex-row justify-center pr-3 items-center mt-4 gap-3 p-4 text-md">
      <Link
        to={"/account/profile"}
        // className="flex gap-3 p-2 px-7 border rounded-2xl bg-gray-200"
        className={`${activeLink("/account/profile")}`}
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
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Profile
      </Link>
      <Link
        to={"/account/bookings"}
        className={`${activeLink("/account/bookings")}`}
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        Bookings
      </Link>
      <Link
        to={"/account/accomodations"}
        className={`${activeLink("/account/accomodations")}`}
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
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        Accomodations
      </Link>
    </div>
  );
};

export default Account;
