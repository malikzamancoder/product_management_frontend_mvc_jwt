import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "https://inspiring-recreation-production-0f3d.up.railway.app/user/createuser",
        {
          username,
          password,
        }
      );


      alert("User created successfully!");

      navigate("/login");


    } catch (error) {

      console.error("Signup error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create user. Please try again."
      );

    }
  };



  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-slate-800
      px-4
    ">


      <div className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
      ">


        {/* Heading */}

        <div className="text-center mb-8">

          <h1 className="
            text-3xl
            font-bold
            text-gray-800
          ">
            Create Account 🚀
          </h1>


          <p className="
            text-gray-500
            mt-2
          ">
            Register to start using our platform
          </p>


        </div>



        <form 
          onSubmit={handleSignup}
          className="space-y-5"
        >



          {/* Username */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            ">
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
                transition
              "

              required

            />


          </div>





          {/* Password */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-2
            ">
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
                transition
              "

              required

            />


          </div>





          {/* Button */}

          <button

            type="submit"

            className="
              w-full
              py-3
              bg-blue-600
              text-white
              font-semibold
              rounded-xl
              hover:bg-blue-700
              transition
              shadow-lg
            "

          >

            Create Account

          </button>




        </form>




        <p className="
          text-center
          text-gray-500
          mt-6
          text-sm
        ">

          Already have an account?


          <span

            onClick={()=>navigate("/login")}

            className="
              text-blue-600
              font-semibold
              cursor-pointer
              ml-1
              hover:underline
            "

          >

            Login

          </span>


        </p>



      </div>


    </div>

  );
};


export default Signup;