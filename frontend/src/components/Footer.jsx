import logo_w from "../assets/logo_w.png";

function Footer() {
  return (
    <div className="bg-black text-white flex flex-col items-center justify-center pt-5 pb-5">
      <div className="w-14">
        <img src={logo_w} alt="Logo" />
      </div>
      <div className="text-white text-sm pt-3">BLACKTREE</div>
      <ul className="flex pt-8 text-white list-none space-x-5">
        <li>Search</li>
        <li>Blogs</li>
        <li>Liked</li>
      </ul>
      <div className="bg-primary w-11/12 rounded-md h-10 mt-4 flex items-center justify-between">
        <input type="text" className="h-10 w-3/4 outline-none rounded-md px-3 text-sm text-black bg-gray-300" />
        <button className="text-white px-2">Subscribe</button>
      </div>
      <div className="text-white text-[10px] mt-4">
        @2023 Copyright Reserved
      </div>
    </div>
  );
}

export default Footer;
