import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons
import Header from "../../Components/Header";
import { Base_Url } from "../../Constants/Global-constants";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${Base_Url}users`);
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);

        toast.success("Users fetched successfully!", {
          icon: <CheckCircle className="text-green-500 size-5" />,
        });
      } catch (error) {
        toast.error(error.message || "Failed to fetch users", {
          icon: <XCircle className="text-red-500 size-5" />,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="w-full h-20 bg-gray-100 py-2 flex justify-center bg-gradient-to-tr from-red-300 to-blue-400">
        <Header />
      </div>

      <div className="w-full flex justify-end items-center p-4">
        <Link
          to="/home"
          className="flex px-4 py-2 gap-5 bg-gradient-to-tr from-red-300 to-blue-400 text-white rounded transition duration-300 ease-in-out hover:scale-105 hover:from-red-400 hover:to-blue-500"
        >
          <span className="font-semibold">New Login</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-6 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-3/4 max-h-[calc(100vh-180px)] mx-auto bg-white p-6 overflow-hidden">
        <h1 className="text-2xl font-semibold mb-2">All Users</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-y-auto h-full shadow-md">
            <table className="min-w-full h-auto bg-white shadow-md rounded-lg border">
              <thead className="sticky top-0 z-10 rounded-lg">
                <tr className="bg-gray-200 text-center text-sm uppercase rounded-lg">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Updated At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-100 text-center"
                  >
                    <td className="p-3 text-sm border">{index + 1}</td>
                    <td className="p-3 text-sm border">{user.username}</td>
                    <td className="p-3 text-sm border">{user.email}</td>
                    <td className="p-3 text-sm border">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="p-3 text-sm border">
                      {formatDate(user.updatedAt)}
                    </td>
                    <td className="p-3 text-sm border w-fit ">
                      <Link
                        to="/home"
                        state={{ userData: user }}
                        className="flex items-center justify-center gap-2 py-2.5 px-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <span>Login</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                            />
                          </svg>
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">
            No Users Found.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
