import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const loginHandeler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data?.message);
        setUser(data?.isUser);
        setRedirect(true);
      } else {
        toast.error(data?.message);
        setRedirect(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(data?.message);
      setRedirect(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-20 p-4 px-7 h-full">
        <h1 className="text-4xl mt-12">Login</h1>
        <form
          className="w-full sm:w-1/3 text-md flex flex-col mt-7 "
          onSubmit={loginHandeler}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="paswword"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary text-white">
            Submit
          </button>
          <span className="mx-auto text-gray-500 mt-5">
            Don't have an account yet? <Link to={"/register"}>Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
