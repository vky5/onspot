import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CgMenuRight } from "react-icons/cg";


function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleClick = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex justify-between items-center w-full">
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-300 font-semibold">
                OnSpot
            </h1>

            
            <div className="relative z-[99] md:hidden" onClick={handleClick}>
                {mobileMenu ? (
                    <IoMdClose className={"text-2xl text-white"} />
                ) : (
                    <CgMenuRight className={"text-2xl text-white"} />
                )}
      </div>
            {
                mobileMenu && (
                    <div className="absolute">
                        Hey
                    </div>
                )
            }
            
            <div className="hidden md:block p-2 px-6 rounded-3xl relative">
                <ul className="flex space-x-4 text-white text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                    <li className="hover:text-blue-900">Home</li>
                    <li className="hover:text-blue-900">Categories</li>
                    <li className="hover:text-blue-900">About Us</li>
                </ul>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white opacity-50 rounded-3xl pointer-events-none"></div>
            </div>
            
        </div>
    );
}

export default Navbar;
