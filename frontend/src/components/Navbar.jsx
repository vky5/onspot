import logo from "../assets/logo.png";
import dark_mode from "../assets/dark_mode_button.png";
import search from "../assets/search.png";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggle = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <div className="px-4 py-3 bg-gray-100 flex justify-between items-center">
      <div>
        <img src={logo} alt="logo of blacktree" />
      </div>
      <div className="flex w-3/5 justify-around items-center">
        <div>
          <img src={dark_mode} />
        </div>
        <div>
          <button className="bg-primary text-white px-4 py-1 rounded-xl">
            Login
          </button>
        </div>
        <div>
          <img src={search} />
        </div>
        <div onClick={toggle} className="mobilemenu relative z-[99]">
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
          } w-3/4`}
        >
          <div className="">
            {/* <img src={logo} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
