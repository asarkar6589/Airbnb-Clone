import React, { useEffect, useState } from "react";
import Account from "./Account";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const NewPlace = () => {
  const { id } = useParams(); // We will basically use the id for the editing purpose of the places, so that we can edit the information of the place.
  // console.log(id);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]); // to show the added photos
  const [description, setDescription] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState(11);
  const [checkOut, setCheckOut] = useState(17);
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    axios
      .get("/place/" + id)
      .then(({ data }) => {
        // console.log(data);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setCheckedItems(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  const updateDetails = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      checkedItems,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      const { data } = await axios.put("/update/" + id, placeData);
      console.log(data);
      toast.success(data.message);
      setRedirect(true);
    } catch (error) {
      toast.error(data.message);
      setRedirect(false);
    }
  };

  const uploadPhoto = async (e) => {
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("photos", e.target.files[i]);
    }

    try {
      const { data } = await axios.post("/upload-place-photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAddedPhotos([...data, ...addedPhotos]);
      // setAddedPhotos((prev) => {
      //   return [...data, ...prev];
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((item) => item !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const deleteHandeler = (e, picture) => {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((item) => item !== picture)]); // After filtering out the photos, we have to add it to setAddedPhotos so that it can be updated in the frontend.
  };

  const submitHandeler = async (e) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      checkedItems,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      const { data } = await axios.post("/add-place", placeData);
      // console.log(data);
      toast.success("Place Added");
      setRedirect(true);
    } catch (error) {
      console.log(error);
      toast.success("Error");
    }
  };

  if (redirect) {
    return <Navigate to={"/account/accomodations"} />;
  }

  return (
    <div>
      <Account />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="p-4 px-7">
            <form onSubmit={id ? updateDetails : submitHandeler}>
              <div>
                <h1 className="text-2xl">Title</h1>
                <p className="text-gray-500">
                  Title for your place. It should be short and catchy as in
                  advertisement
                </p>
                <input
                  type="text"
                  placeholder="Enter the title of your place"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <h1 className="text-2xl">Address</h1>
                <p className="text-gray-500">Address to this place</p>
                <input
                  type="text"
                  placeholder="Enter the address of your place"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="w-full">
                <h1 className="text-2xl">Photos</h1>
                <p className="text-gray-500">More = Better</p>
                <div className="flex gap-2"></div>
                <div className="flex flex-wrap gap-3 mb-2">
                  {addedPhotos?.length > 0 &&
                    addedPhotos?.map((picture) => (
                      <div id={picture} className="relative">
                        <img
                          src={`http://localhost:5000/uploads/${picture}`}
                          alt={`${picture}`}
                          className="w-60 rounded-2xl h-40"
                        />

                        <button
                          onClick={(e) => {
                            deleteHandeler(e, picture);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 absolute text-white bg-black rounded-full top-12 mt-20 left-10 ml-40 p-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
                <label className="h-32 flex items-center justify-center border bg-transparent rounded-2xl p-2 text-xl text-gray-500 gap-2 cursor-pointer md:w-1/6">
                  <input
                    type="file"
                    multiple
                    name="photos"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      uploadPhoto(e);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload From Device
                </label>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl">Description</h1>
                <p className="text-gray-500">Description about the place</p>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Perks */}
              <div>
                <h1 className="text-2xl">Perks</h1>
                <p className="text-gray-500">Select all the perks</p>
                <div className="flex flex-col justify-between">
                  {/* First 3 perks */}
                  <div className="flex flex-col md:flex-row gap-5 mt-2">
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="Wifi"
                        checked={checkedItems?.includes("Wifi")}
                        onChange={() => handleCheckboxChange("Wifi")}
                      />
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
                          d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                        />
                      </svg>
                      Wifi
                    </label>
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="Parking"
                        checked={checkedItems?.includes("Parking")}
                        onChange={() => handleCheckboxChange("Parking")}
                      />
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
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                      Free Parking Spot
                    </label>
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="TV"
                        checked={checkedItems?.includes("TV")}
                        onChange={() => handleCheckboxChange("TV")}
                      />
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
                          d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                      TV
                    </label>
                  </div>
                  {/* Last 3 perks */}
                  <div className="flex flex-col md:flex-row gap-5 mt-2">
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="Radio"
                        checked={checkedItems?.includes("Radio")}
                        onChange={() => handleCheckboxChange("Radio")}
                      />
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
                          d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                      Radio
                    </label>
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="Pets"
                        checked={checkedItems?.includes("Pets")}
                        onChange={() => handleCheckboxChange("Pets")}
                      />
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
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                      Pets
                    </label>
                    <label className="flex border rounded-2xl w-full p-4 text-2xl items-center gap-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="Enterance"
                        checked={checkedItems?.includes("Enterance")}
                        onChange={() => handleCheckboxChange("Enterance")}
                      />
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
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      Private Enterance
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl">Extra Information</h1>
                <p className="text-gray-500">House rules, etc.</p>
                <textarea
                  value={extraInfo}
                  onChange={(e) => {
                    setExtraInfo(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <h1 className="text-2xl">Check In & Out Times</h1>
                <p className="text-gray-500">
                  Add check in and check out times, remember to have some time
                  window for cleaning the room between guests
                </p>
                <div className="flex flex-col md:flex-row w-full justify-between mt-4">
                  <div>
                    <h1 className="text-xl text-center">Check In Time</h1>
                    <input
                      type="number"
                      placeholder="14:00"
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-center">Check Out Time</h1>
                    <input
                      type="number"
                      placeholder="17:00"
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-center">
                      Maximum Number of Guests
                    </h1>
                    <input
                      type="number"
                      value={maxGuests}
                      onChange={(e) => {
                        setMaxGuests(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-center">Price Per Night</h1>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="primary w-full">
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPlace;
