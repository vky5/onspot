import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg";
import blacktree from "../assets/blacktree.png";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleClick = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className="bg-gray-100">
      <div className="border-b-2 border-emerald"></div>
      <div className="px-2 py-2 md:px-4 md:py-4 flex justify-between">
        <div className="flex w-12 md:w-20 items-center">
          <img src={blacktree} alt="blacktree logo" className="" />
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl">
            Blacktree
          </div>
        </div>

        <div
          className="relative z-[99] md:hidden flex justify-center items-center"
          onClick={handleClick}
        >
          {mobileMenu ? (
            <IoMdClose className={"text-2xl "} />
          ) : (
            <CgMenuRight className={"text-2xl"} />
          )}
        </div>

        <div className="hidden md:flex md:block relative justify-center">
          <ul className="space-x-4 lg:space-x-6 text-xl md:text-lg lg:text-xl xl:text-xl flex justify-center items-center">
            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-emerald group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-gray-100 border-2 border-emerald group-hover:bg-emerald"></span>
              <span className="relative text-gray-900 group-hover:text-gray-100">
                Home
              </span>
            </li>

            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-emerald group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-gray-100 border-2 border-emerald group-hover:bg-emerald"></span>
              <span className="relative text-gray-900 group-hover:text-gray-100">
                Categories
              </span>
            </li>
            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-emerald group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-gray-100 border-2 border-emerald group-hover:bg-emerald"></span>
              <span className="relative text-gray-900 group-hover:text-gray-100">
                About Us
              </span>
            </li>

            <li className="relative inline-flex items-center justify-center p-4 px-2 py-2 overflow-hidden font-medium text-emerald transition duration-300 ease-out border-2 border-green-500 rounded-none shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-gray-100 duration-300 -translate-x-full bg-emerald group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-gray-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                Login
              </span>
              <span className="relative invisible">Button Text</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-1">

      <div className="border-b-2 border-emerald"></div>
      <div className="border-b-2 border-emerald"></div>
      </div>
    </div>
  );
}

export default Navbar;
