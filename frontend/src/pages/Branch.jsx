import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../main";
import TipTapEditor from "../components/Branch/TipTapEditor";

function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState("");

  const handleChange = (newContent) =>{
    setCon
  }

  return (
    <div
      className={`duration-200 transition-colors ${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-black"
      }`}
    >
      <div className="flex items-center justify-between pl-5 pr-5 pt-7">
        <HiArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <button className="bg-primary text-white px-3 py-1 rounded-xl">
          Branch
        </button>
      </div>
      <div className="relative mt-8 ml-8 mr-8 text-sm pb-10">
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="Branch heading..."
            className={`w-full p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black"
                : "bg-black text-white"
            }`}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <TipTapEditor />
        </div>
      </div>
    </div>
  );
}

export default Branch;
