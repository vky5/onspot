import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuthImg from "../components/AuthComponents/GoogleAuthImg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, UserContext } from "../main";
import { vkyreq } from "../utils/vkyreq";

function Signup() {
  // importing env variables
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const backend = import.meta.env.VITE_BACKEND_URL;
  const JWTexpireIn = import.meta.env.VITE_JWT_EXPIRES_IN;

  const navigate = useNavigate();

  const {setLoggedin} = useContext(LoggedInContext);

  const {setUserData} = useContext(UserContext);

  // sending signup request to backend
  const setSignupRequest = async (userData) =>{
    try {
      const res = await axios.post(backend+'/auth/signup', userData);
      console.log(res.data.token);
      setCookie("jwt", res.data.token, JWTexpireIn || 90);
      setLoggedin(true);
      const userDetailInfo = await vkyreq('get', '/users/me');
      setUserData(userDetailInfo.data.data)
      navigate(-1);

    } catch (error) {
      console.log(error);
    }
  }

  
  // state to track changes made in fields of username password and email...
  const [userinfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    img: "" // check what is the name of image in googleoauth response
  })
  

  // to check if the state is updated in google oauth or not...
  const [updated, setUpdated] = useState(false);

  useEffect(()=>{
    const checkerFunc = ()=>{
      if (updated){
        setSignupRequest(userinfo);
        setUpdated(false);
      }
    }

    checkerFunc();
  }, [updated])


  return (
    <div className="bg-primary h-screen flex justify-center items-center flex-col">
      <div className="text-white text-3xl font-semibold">Sign up</div>

      <div className="w-11/12 flex flex-col justify-center text-center">
      <div className="text-white mt-5 text-xs text-left">Username</div>
        <div>
          <input
            type="text"
            className="h-12 rounded-md bg-secondary placeholder:text-center placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Username"
            onChange={()=>{
              setUserInfo({...userinfo, username: event.target.value})
            }}
          />
        </div>
        <div className="text-white mt-5 text-xs text-left">Email</div>
        <div className="">
          <input
            type="text"
            className="h-12 rounded-md bg-secondary placeholder:text-center placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Email"
            onChange={()=>{
              setUserInfo({...userinfo, email: event.target.value})
            }}
          />
        </div>
        <div className="text-white mt-5 text-xs text-left">Password</div>
        <div>
          <input
            type="text"
            className="h-12 rounded-md bg-secondary placeholder-gray-300 placeholder:text-center w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Password"
            onChange={()=>{
              setUserInfo({...userinfo, password: event.target.value})
            }}
          />
        </div>

        <div>
          
          <div>
            <button className="bg-white text-xl text-primary w-full mt-8 pt-3 pb-3 rounded-3xl" onClick={()=>setSignupRequest(userinfo)}>
              Sign up
            </button>
            <div className="text-white w-full text-center mt-3 text-xs">
              -OR-
            </div>
            <div className="text-white w-full text-center text-[10px] mt-3">
              Sign in with
            </div>
            <GoogleOAuthProvider
              clientId={clientId}
            >
              <GoogleAuthImg updatingUserInfo={setUserInfo} trackUserInfo={setUpdated}/>
            </GoogleOAuthProvider>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;