import email from "../assets/email.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import google from "../assets/Google.png";
import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

import { Link } from "react-router-dom";

function Signin() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = () => {
    console.log("Success");
  };

  const handleError = () => {
    console.log("error");
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleLogin({
        clientId: clientId,
        onSuccess: handleSuccess,
        onError: handleError,
      });
      if (response.success) {
        console.log("Google authentication successful");
      } else {
        console.log("Google authentication failed");
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return (
    <div className="bg-primary h-screen flex justify-center items-center flex-col">
      <div className="text-white text-3xl font-semibold">Sign In</div>

      <div className="w-11/12 flex flex-col justify-center text-center">
        <div className="text-white mt-5 text-xs text-left">Email</div>
        <div className="">
          <input
            type="text"
            className="h-12 rounded-md bg-secondary placeholder:text-center placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Email"
          />
        </div>
        <div className="text-white mt-5 text-xs text-left">Password</div>
        <div>
          <input
            type="text"
            className="h-12 rounded-md placeholder:text-center bg-secondary placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Password"
          />
        </div>

        <div className="text-white text-xs  mt-3 text-right underline rounded-md">
          Forget Password?
        </div>
        <div>
          <label className="flex mt-3">
            <input
              type="checkbox"
              className="form-checkbox text-6DADA2 focus:ring-6DADA2"
            />
            <div className="ml-1 text-xs text-white">Remember Me</div>
          </label>
          <div>
            <button className="bg-white text-xl text-primary w-full mt-8 pt-3 pb-3 rounded-3xl">
              Login
            </button>
            <div className="text-white w-full text-center mt-3 text-xs">
              -OR-
            </div>
            <div className="text-white w-full text-center text-[10px] mt-3">
              Sign in with
            </div>
            {/* Wrap GoogleLogin component inside GoogleOAuthProvider */}
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                render={({ onClick }) => (
                  <button onClick={onClick} className="bg-white rounded-full p-2 mt-2">
                    <img src={google} alt="Google" />
                  </button>
                )}
              />
            </GoogleOAuthProvider>

            <div className="text-[12px] text-white  text-left mt-2">
              <Link to="/signup">
                <span>Don't have an account? </span>
                <span className="font-extrabold">Create one</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
