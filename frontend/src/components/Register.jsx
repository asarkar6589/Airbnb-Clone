import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState();
  const [redirect, setRedirect] = useState(false);

  const onChangeInput = (e) => {
    // console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const uploadProfilePhoto = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const { data } = await axios.post("/profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(data);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occured. Please try again");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        phone,
        email,
        password,
        image,
      };
      const { data } = await axios.post("/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(data.message);
      setRedirect(true);
    } catch (error) {
      toast.error(error.message);
      setRedirect(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex justify-center items-center flex-col mt-10 p-4 px-7">
      <h1 className="text-4xl mt-12">Register</h1>
      <form
        className="w-full sm:w-1/3 text-md flex flex-col mt-7"
        onSubmit={registerUser}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
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
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={onChangeInput}
        />

        <div className="flex justify-center items-center gap-5">
          <button
            className="primary text-white w-full"
            onClick={uploadProfilePhoto}
          >
            Upload Photo
          </button>
          <button type="submit" className="primary w-full text-white">
            Submit
          </button>
        </div>
      </form>
      <span className="mx-auto text-gray-500 mt-5">
        Already have an account? <Link to={"/login"}>Login</Link>
      </span>
    </div>
  );
};

export default Login;
