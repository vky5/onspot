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
    <div>
      <div className="px-2 py-2 md:px-4 md:py-4 flex justify-between">
        <div className="flex w-12 md:w-20">
          <img src={blacktree} alt="blacktree logo" className="" />
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
          <ul className="space-x-4 lg:space-x-6 text-xl md:text-xl lg:text-2xl xl:text-2xl flex justify-center items-center">
            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-green-600 group-hover:bg-green-600"></span>
              <span className="relative text-black group-hover:text-white">
                Home
              </span>
            </li>

            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-green-600 group-hover:bg-green-600"></span>
              <span className="relative text-black group-hover:text-white">
                Categories
              </span>
            </li>
            <li className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-green-600 group-hover:bg-green-600"></span>
              <span className="relative text-black group-hover:text-white">
                About Us
              </span>
            </li>

            <li className="relative inline-flex items-center justify-center p-4 px-2 py-2 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-none shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-600 group-hover:translate-x-0 ease">
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
              <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                Login
              </span>
              <span className="relative invisible">Button Text</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-1">

      <div className="border-b-2 border-green-600"></div>
      <div className="border-b-2 border-green-600"></div>
      </div>
    </div>
  );
}

export default Navbar;
