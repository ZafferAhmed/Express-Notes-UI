/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import NotesForm from "./NotesForm";

const Notes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUserData =
    location.state?.userData ||
    JSON.parse(localStorage.getItem("userData")) ||
    {};
  const [user, setUser] = useState(initialUserData);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser({});
    toast.success("Logout successful!");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    if (location.state?.userData) {
      localStorage.setItem("userData", JSON.stringify(location.state.userData));
    }
  }, []);

  return (
    <>
      <section className="w-full h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="w-full mx-auto h-20 flex items-center justify-center bg-gradient-to-tr from-red-300 to-blue-400">
          <div className="container  flex justify-between items-center">
            <div className="text-white">
              <span className="text-2xl">
                Welcome, {user?.user?.username || "Guest"}!
              </span>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center">
          <div className="w-3/4">
            <NotesForm />
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={true} />
      </section>
    </>
  );
};

export default Notes;
