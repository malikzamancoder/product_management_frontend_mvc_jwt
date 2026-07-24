import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://inspiring-recreation-production-0f3d.up.railway.app/user/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("loginToken", response.data.token);

      alert("Login successful!");

      navigate("/products");

    } catch (error) {

      console.error("Error logging in:", error);

      alert(
        error.response?.data?.message ||
        "Failed to login. Please check your credentials."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">


        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>

        </div>



        <form onSubmit={handleLogin} className="space-y-5">


          {/* Username */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>

            <input

              type="text"

              value={username}

              onChange={(e)=>setUsername(e.target.value)}

              placeholder="Enter your username"

              className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              "

              required

            />

          </div>




          {/* Password */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>


            <input

              type="password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              placeholder="Enter your password"

              className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              "

              required

            />


          </div>




          {/* Button */}

          <button

            type="submit"

            disabled={loading}

            className="
            w-full
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            shadow-lg
            transition
            disabled:opacity-50
            "

          >

            {
              loading 
              ? "Logging in..."
              : "Login"
            }

          </button>


        </form>



        <p className="text-center text-gray-500 text-sm mt-6">

          Don't have an account?

          <span
            onClick={()=>navigate("/signup")}
            className="
            text-blue-600
            font-semibold
            cursor-pointer
            ml-1
            hover:underline
            "
          >
            Create Account
          </span>

        </p>


      </div>


    </div>
  );
};

export default Login;