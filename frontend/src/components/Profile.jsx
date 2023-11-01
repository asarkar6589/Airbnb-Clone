import React, { useContext, useState } from "react";
import Account from "./Account";
import axios from "axios";
import { UserContext } from "../App";
import { LoaderIcon, toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const Profile = () => {
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const logoutHandeler = async () => {
    try {
      const { data } = await axios.get("/logout");
      toast.success(data.message);
      setRedirect(true);
      setUser(null);
    } catch (error) {
      console.log(error);
      setRedirect(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Account />

      <div className="flex justify-center items-center mt-12">
        {loading ? (
          <Loader />
        ) : (
          <>
            {user && (
              <div className="flex flex-col items-center justify-center">
                {user?.photo && (
                  <img
                    className="w-80 h-80 rounded-full object-fit"
                    src={`http://localhost:5000/uploads/${user.photo}`}
                    alt="Profile Picture"
                  />
                )}
                <div className="flex items-center justify-center mt-5">
                  <h1 className="text-2xl font-semibold">Name: {user.name}</h1>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">
                    Email: {user.email}
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">
                    Phone Number: {user.phone}
                  </h1>
                </div>
                <button
                  className="primary w-full mt-5"
                  onClick={logoutHandeler}
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
