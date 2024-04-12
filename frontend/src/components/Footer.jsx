import { useState } from "react";
import paperplane from "../assets/paperplane.png";
import {
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoDiscord,
  BiLogoTwitter,
} from "react-icons/bi";

function Footer() {
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <div className="p-4 mt-10 text-white bg-white rounded-3xl bg-opacity-20 drop-shadow-sm w-11/12">
      <div className="items-center justify-between ">
        <h1>Subscribe now, Get latest updates!</h1>

        {/* this section has input box and button */}
        <div className="bg-blue-900 rounded-3xl flex-1 flex items-center mt-2">
          <input
            type="text"
            name="user_email"
            id="signupemail"
            className={`text-blue-900 rounded-3xl outline-none border-blue-900 w-full px-3 py-3 text-[12px] bg-white font-bold duration-[10000] ${
              email ? "w-3/4" : "w-full"
            }`}
            placeholder="Email Address !!"
            value={email}
            onChange={handleInputChange}
            style={{
              transition: "width 1fs ease",
            }}
          />
          {email && (
            <button
              className={`cursor-pointer pl-2 text-[12px] flex items-center`}
              onClick={handleSubmit}
            >
              <span className="text-xs">Sign up!</span>
              <img
                src={paperplane}
                className="w-4 ml-1 mr-5"
                alt="paper plane"
              />
            </button>
          )}
        </div>

        {/* <div className='w-full h-2 mt-3 rounded-xl bg-blue-900'></div> */}

        {/* this section has contact me */}
        <div className="pt-3 pb-3 items-center">
          <span className="">Contact me on: </span>
          <div className="flex space-x-4 items-center w-full mt-2 flex-1">
            <div>
              <a href="https://www.linkdin.com">
                <BiLogoLinkedin className="text-white md:text-2xl xl:text-3xl hover:text-blue-900" />
              </a>
            </div>
            <div>
              <a href="https://www.twitter.com">
                <BiLogoTwitter className="text-white md:text-2xl hover:text-blue-900" />
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com">
                <BiLogoInstagram className="text-white md:text-2xl hover:text-blue-900" />
              </a>
            </div>
            <div>
              <a href="https://www.youtube.com/">
                <BiLogoDiscord className="text-white md:text-2xl hover:text-blue-900" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* this section has bla bla info */}
      <div className="text-[12px] md:text-xl">@vky5-2024</div>
    </div>
  );
}

export default Footer;
