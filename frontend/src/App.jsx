import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { createContext, useEffect, useState } from "react";
import Account from "./components/Account";
import Profile from "./components/Profile";
import Bookings from "./components/Bookings";
import Accomodations from "./components/Accomodations";
import NewPlace from "./components/NewPlace";
import BookingPage from "./components/BookingPage";
import BookingConformationPage from "./components/BookingConformationPage";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/my-profile")
      .then((response) => {
        setUser(response.data.userDoc);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/account"} element={<Account />} />
          <Route path={"/account/profile"} element={<Profile />} />
          <Route path={"/account/bookings"} element={<Bookings />} />
          <Route path={"/account/accomodations"} element={<Accomodations />} />
          <Route path={"/account/accomodations/new"} element={<NewPlace />} />
          <Route path={"/account/accomodations/:id"} element={<NewPlace />} />
          <Route path={"/booking/:id"} element={<BookingPage />} />
          <Route
            path={"/account/booking/:id"}
            element={<BookingConformationPage />}
          />
        </Routes>
        <Toaster />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
