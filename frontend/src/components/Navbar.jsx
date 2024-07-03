import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import dark_mode from "../assets/dark_mode_button.png";

import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useState, useContext } from "react";
import logo_w from "../assets/logo_w.png";
import { MdHome } from "react-icons/md";
import { MdBook } from "react-icons/md";
import { FaHeart, FaSearch } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import profile from "../assets/profile.png";
import light_mode from "../assets/light_mode.png";
import logo_w_header from "../assets/logo_w_header.png";
import { ModeContext, LoggedInContext, UserContext } from "../main";
import { deleteCookie } from "../utils/Cookies";

function Navbar() {
  const { isLoggedin, setLoggedin } = useContext(LoggedInContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const { mode, toggleMode } = useContext(ModeContext);

  const { userData } = useContext(UserContext);

  const toggle = () => {
    setMobileMenu(!mobileMenu);
    if (!mobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <div
      className={`px-4 py-3 bg-gray-100 flex justify-between items-center relative z-10 duration-200 ${
        mode === "light" ? "bg-gray-100" : "bg-priDark"
      }`}
    >
      <div>
        <Link to="/">
          <img
            src={mode === "light" ? logo : logo_w_header}
            alt="logo of blacktree"
          />
        </Link>
      </div>
      <div className="flex w-3/5 justify-around items-center">
        <div onClick={toggleMode}>
          <img src={mode === "light" ? dark_mode : light_mode} />
        </div>
        <div>
          {!isLoggedin ? (
            <Link to="/login">
              <button className="bg-primary text-white px-4 py-1 rounded-xl">
                Login
              </button>
            </Link>
          ) : (
            <button
              className="bg-primary text-white px-4 py-1 rounded-xl"
              onClick={() => {
                deleteCookie("jwt");
                setLoggedin(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
        <div
          className={`${
            mode === "light" ? "text-priDark" : "text-gray-100"
          } font-thin`}
        >
          <FaSearch />
        </div>
        <div
          onClick={toggle}
          className={`mobilemenu relative z-[99] ${
            mode === "light" ? "text-priDark" : "text-gray-100"
          }`}
        >
          {mobileMenu ? (
            <IoMdClose className="text-2xl" />
          ) : (
            <CgMenuRight className="text-2xl" />
          )}
        </div>

        {/*sideBar*/}
        <div
          className={`md:w-64 bg-primary h-full fixed top-0 right-0 transition-all duration-300 transform ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          } w-3/4 rounded-l-3xl z-50`}
        >
          <div className="h-5/6 fixed bottom-0 px-3 flex flex-col justify-between w-full mb-8 overflow-y-auto">
            <div className="space-y-6">

              {/* used flex and items-center to align everything in one line */}
              <div className="flex items-center text-white space-x-4">


                {/* this is for the profile picture */}
                <div className="flex justify-center items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={
                        userData.img === ""
                          ? profile
                          : userData.img
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* for username and email */}
                <div>
                  <div className="text-xl">{userData.username}</div>
                  <div className="text-xs">{userData.email}</div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col items-center text-white text-[20px] ">
                <Link
                  to="/"
                  onClick={toggle}
                  className="flex items-center justify-center w-full px-12 rounded-xl border-2 p-2 cursor-pointer bg-transparent border-gray-200 text-white hover:text-black hover:bg-white hover:border-black transition-colors"
                >
                  <MdHome className="mr-2" /> {/* Icon */}
                  <span className="">Home</span> {/* Text */}
                </Link>

                <Link
                  to="/blogs"
                  onClick={toggle}
                  className="flex items-center justify-center w-full px-12 rounded-xl border-2 p-2 cursor-pointer bg-transparent border-gray-200 text-white hover:text-black hover:bg-white hover:border-black transition-colors"
                >
                  <MdBook className="mr-2" /> {/* Icon */}
                  <span className="">Blogs</span> {/* Text */}
                </Link>

                <Link
                  to="/profile"
                  onClick={toggle}
                  className="flex items-center justify-center w-full px-12 rounded-xl border-2 p-2 cursor-pointer bg-transparent border-gray-200 text-white hover:text-black hover:bg-white hover:border-black transition-colors"
                >
                  <FaHeart className="mr-2" />
                  <span className="">Profile</span>
                </Link>
                <div className="flex items-center justify-center w-full px-12 rounded-xl border-2 p-2 cursor-pointer bg-transparent border-gray-200 text-white hover:text-black hover:bg-white hover:border-black transition-colors">
                  <AiOutlineUser className="mr-2" /> {/* Icon */}
                  <span className="">About Us</span> {/* Text */}
                </div>
              </div>
            </div>

            <div className="flex text-white justify-center items-center">
              <div>
                <img src={logo_w} />
              </div>
              <div className="ml-3 text-[17px]">BLACKTREE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
