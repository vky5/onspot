import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuthImg from "../components/AuthComponents/GoogleAuthImg";
import { setCookie } from "../utils/Cookies";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LoggedInContext, UserContext } from "../main";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { vkyreq } from "../utils/vkyreq";

function Signin() {
  // importing all environment variables
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const backend  = import.meta.env.VITE_BACKEND_URL;
  const JWTexpireIn = import.meta.env.VITE_JWT_EXPIRES_IN;

  const navigate = useNavigate();
  const { setLoggedin } = useContext(LoggedInContext);

  const {setUserData} = useContext(UserContext);

  const sendLogin = async (userData) => {
    try {
      const res = await axios.post(backend + "/auth/login", userData);
      console.log(res.data.token);
      
      setCookie("jwt", res.data.token, JWTexpireIn || 90);
      setLoggedin(true);
      const userDetailInfo = await vkyreq('get', '/users/me');
      setUserData(userDetailInfo.data.data)

      navigate(-1);

    } catch (error) {
      console.log(error);
    }
  };

  // to update the userInfo
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // to check if the state is updated in google oauth or not...
  const [updated, setUpdated] = useState(false);

  //  // Step 2: Create a state variable
  //  const [isChecked, setIsChecked] = useState(false);

  //  // Step 3: Update the state variable when the checkbox is clicked
  //  const handleCheckboxChange = (event) => {
  //    setIsChecked(event.target.checked);
  //  };
 
  // to send the data is
  useEffect(() => {
    const checkerFunc = () => {
      if (updated) {
        sendLogin(userInfo);
        setUpdated(false);
      }
    };

    checkerFunc();
  }, [updated]);

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
            onChange={() => {
              setUserInfo({ ...userInfo, email: event.target.value });
            }}
          />
        </div>
        <div className="text-white mt-5 text-xs text-left">Password</div>
        <div>
          <input
            type="text"
            className="h-12 rounded-md placeholder:text-center bg-secondary placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Password"
            onChange={() => {
              setUserInfo({ ...userInfo, password: event.target.value });
            }}
          />
        </div>

        <div className="text-white text-xs  mt-3 text-right underline rounded-md">
          Forget Password?
        </div>
        <div>
          <div> 
            <button className="bg-white text-xl text-primary w-full mt-8 pt-3 pb-3 rounded-3xl" onClick={()=>sendLogin(userInfo)}>
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
              <GoogleAuthImg
                updatingUserInfo={setUserInfo}
                trackUserInfo={setUpdated}
              />
            </GoogleOAuthProvider>

            {/* for the Sign up button */}
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
