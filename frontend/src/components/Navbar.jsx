import logo from "../assets/logo.png";
import dark_mode from "../assets/dark_mode_button.png";
import search from "../assets/search.png";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import logo_w from "../assets/logo_w.png";
import { MdHome } from "react-icons/md";
import { MdBook } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

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
          } w-3/4 rounded-l-3xl`}
        >
          <div className="h-5/6 fixed bottom-0 px-3 flex flex-col justify-between w-full mb-8">
            <div className="space-y-6">
              <div className="flex text-white space-x-4">
                <img src={logo} />
                <div>
                  <div className="text-xl">Pikachu Poke</div>
                  <div className="text-xs">pikachu@gmail.com</div>
                </div>
              </div>
              <div className="space-y-4 flex flex-col items-center text-white text-[20px] ">
                <div className="flex items-center w-full px-12 rounded-xl border-2 border-white p-2">
                  <MdHome />
                  Home
                </div>

                <div className="flex items-center w-full rounded-xl border-2 border-white p-2">
                  <MdBook />
                  Blogs
                </div>
                <div className="flex items-center w-full rounded-xl border-2 border-white p-2">
                  <FaHeart />
                  Liked
                </div>
                <div className="flex items-center w-full rounded-xl border-2 border-white p-2">
                  <AiOutlineUser />
                  Home
                </div>
              </div>
            </div>

            <div className="flex text-white justify-center items-center">
              <div>
                <img src={logo_w} />
              </div>
              <div className="ml-3 text-[20px]">BLACKTREE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
