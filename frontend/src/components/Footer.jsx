import logo_w from "../assets/logo_w.png";

function Footer() {
  return (
    <div className="bg-priDark text-white pt-5 pb-5 flex flex-col items-center">
      <div className="flex flex-col items-center justify-between w-3/4 max-w-6xl md:flex-row md:justify-between">
        <div className="flex items-center justify-center md:justify-start md:w-auto">
          <img src={logo_w} alt="Logo" className="w-20" />  {/* Increased size */}
          <div className="text-white text-sm pt-3 ml-2 hidden md:block">OnSpot</div>
        </div>
        <div className="bg-primary w-full md:w-1/3 rounded-xl h-10 mt-4 flex items-center justify-between md:mt-0">
          <input
            type="text"
            className="h-10 w-3/4 outline-none rounded-xl px-3 text-sm text-black bg-gray-300"
          />
          <button className="text-white px-2 text-[13px]">Subscribe</button>
        </div>
      </div>
      <div className="text-white text-[10px] mt-4 text-center">
        ©2024 Copyright Reserved
      </div>
    </div>
  );
}

export default Footer;
