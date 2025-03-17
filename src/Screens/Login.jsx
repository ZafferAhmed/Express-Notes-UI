import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Base_Url } from "../Constants/Global-constants";
import Loader from "../Components/Loader";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = isSignUp
      ? `${Base_Url}users/signup`
      : `${Base_Url}users/signin`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success(data.message || "Success!");
        if (!isSignUp) {
          localStorage.setItem("userData", JSON.stringify(data));
          setTimeout(() => {
            navigate("/notes", { state: { userData: data } });
          }, 1000);
        } else {
          setIsSignUp(false);
        }
      } else {
        if (data?.message === "User already exists") {
          const toastId = toast.loading(
            "User already exists, Just relax, we are logging you in!"
          );
          setTimeout(async () => {
            const signInResponse = await fetch(`${Base_Url}users/signin`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
              }),
            });

            const signInData = await signInResponse.json();
            toast.dismiss(toastId);

            if (signInResponse.ok) {
              localStorage.setItem("userData", signInData.token);
              toast.success("Signed in successfully!");
              setTimeout(() => {
                navigate("/notes", { state: { userData: signInData } });
              }, 1500);
            } else {
              toast.error(
                signInData.message || "Sign-in failed. Please try again."
              );
            }
          }, 2000);
        } else {
          toast.error(data.message || "Something went wrong!");
        }
      }
    } catch (error) {
      console.error("Error", error);
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  const onFormChange = () => {
    setIsSignUp(!isSignUp);
    if(!isSignUp){
      setFormData({
        username: "",
        password: "",
        email: "",
      });
    }
  };

  useEffect(() => {
    if (location.state?.userData) {
      setFormData({
        username: location.state?.userData.username || "",
        email: location.state?.userData.email || "",
        password: "",
      });
    }
  }, [location.state]);

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader /> : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4 flex gap-2 justify-center">
          {isSignUp ? "Already have an account ?" : "Don't have an account ?"}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => onFormChange()}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </div>
  );
};

export default Login;
