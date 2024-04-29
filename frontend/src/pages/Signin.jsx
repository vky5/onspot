import email from "../assets/email.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import google from "../assets/Google.png";
import { useEffect } from "react";

function Signin() {
  const handleSuccess = () => {
    console.log("Success");
  };
  const handleError = () => {
    console.log("error");
  };

  useEffect(()=>{
    const handleGoogleLogin = async () =>{
        const respnse = await fetch 
    }
  })

  return (
    <div className="bg-primary h-screen flex justify-center items-center flex-col">
      <div className="text-white text-3xl font-semibold">Sign In</div>
      <div>
        <div className="text-white mt-5 text-xs">Email</div>
        <div className="">
          <input type="text" />
        </div>
        <div className="text-white mt-5 text-xs">Password</div>
        <div>
          <input type="text" />
        </div>
        <div className="text-white text-xs  mt-3 text-right">
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
            <div className="flex justify-center w-full">
              <GoogleOAuthProvider clientId="">
                <button className="bg-white rounded-full p-2 mt-2">
                  <img src={google} alt="Google"/>
                </button>
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
