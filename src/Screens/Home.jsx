import React from "react";
import Header from "../Components/Header";
import Login from "./Login";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="flex flex-col w-full h-screen">
        {/* Header */}
        <div className="w-full h-20 bg-gray-100 py-2 flex justify-center bg-gradient-to-tr from-red-300 to-blue-400">
          <Header />
        </div>

        {/* Login Button */}
        <div className="w-full flex justify-end items-center p-4 bg-gray-100">
          <Link
            to="/"
            className="flex px-4 py-2 gap-5 bg-gradient-to-tr from-red-300 to-blue-400 text-white rounded transition duration-300 ease-in-out hover:scale-105 hover:from-red-400 hover:to-blue-500"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </span>
            <span className="font-semibold">Users List</span>
          </Link>
        </div>

        {/* Login Section */}
        <div className="w-full flex-grow bg-gray-200">
          <Login />
        </div>
      </section>
    </>
  );
};

export default Home;
