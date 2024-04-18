import { useEffect, useState } from "react";
import {
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoDiscord,
  BiLogoTwitter,
} from "react-icons/bi";

import validateEmail from "../utils/checkemail";

function Footer() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  const buttonSubmitStyle = {
    backgroundColor: "#059669",
    transition: "background-color 0.3s ease-in-out",
  };
  const buttonDefaultStyle = {
    backgroundColor: "#111827",
    transition: "background-color 0.3s ease-in-out",
  };

  useEffect(() => {
    function checkemail() {
      if (validateEmail(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    }

    checkemail();
  }, [email]);

  return (
    <div className="bg-gray-100 mt-4">
      <div className="bg-gray-100 space-y-1">
        <div className="border-b-2 border-emerald"></div>
        <div className="border-b-2 border-emerald"></div>
      </div>
      <div className="px-1 py-2 md:px-3 md:py-5 xl:px-6 xl:py-6">
        {/*this is the main div in which all text padding is given*/}
        <div className="">
          {/*this is for the different layout we are going to make*/}
          <div className="text-base md:text-basem lg:text-lg xl:text-xl">
            Subscribe now and get the latest updates
          </div>
        </div>
        {/* for email address input box and submit button */}
        <div
          className="bg-gray-900 flex-1 flex items-center mt-2"
          style={isValidEmail ? buttonSubmitStyle : buttonDefaultStyle}
        >
          <input
            type="text"
            name="user_email"
            id="signupemail"
            onChange={handleInputChange}
            className="bg-gray-100 border border-emerald px-2 py-2 text-base md:text-lg lg:text-lg xl:text-xl w-5/6 text-slate"
            style={isValidEmail?{
              opacity: 0.7,
              transition: "opacity 0.3s ease-in-out"
            }: {
              opacity: 1,
              transition: "opacity 0.3s ease-in-out"
            }}
          />
          <button
            className="cursor-pointer flex items-center justify-center w-1/6"
            disabled={!isValidEmail}
          >
            <div className="text-xs md:text-lg lg:text-lg xl:text-xl flex-grow flex items-center justify-center text-gray-100  w-full">
              Sign up!
            </div>
          </button>
        </div>

        <div className="pt-3 pb-1 md:pb-2 items-center">
          <span className="text-base md:text lg:text-lg xl:text-xl">
            Contact me on:
          </span>
          <div className="flex space-x-4 items-center w-full mt-2 flex-1">
            <div>
              <a href="https://www.linkdin.com">
                <BiLogoLinkedin className="md:text-2xl xl:text-3xl hover:text-emerald transform hover:scale-110 transition-transform" />
              </a>
            </div>
            <div>
              <a href="https://www.twitter.com">
                <BiLogoTwitter className="md:text-2xl xl:text-3xl hover:text-emerald transform hover:scale-110 transition-transform" />
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com">
                <BiLogoInstagram className="md:text-2xl xl:text-3xl hover:text-emerald transform hover:scale-110 transition-transform" />
              </a>
            </div>
            <div>
              <a href="https://www.youtube.com/">
                <BiLogoDiscord className="md:text-2xl xl:text-3xl hover:text-emerald transform hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="text-[12px] md:text-xl pt-1 md:pt-2 text-slate">@vky5</div>
        </div>
      </div>
      <div className="border-b-2 border-emerald"></div>
    </div>
  );
}

export default Footer;
