import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../main";
import ToggleButton from "../components/Branch/ToggleButton";

function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textAreaRef = useRef(null);
  const hiddenSpanRef = useRef(null);

  const handleTextAreaInput = (event) => {
    const textArea = event.target;
    const { selectionStart, value } = textArea;
    const textBeforeCursor = value.substring(0, selectionStart);
    const linesBeforeCursor = textBeforeCursor.split('\n'); // this will have different texts separated in the text area in form of an array
    const lineNumber = linesBeforeCursor.length; // simply finding the length of above array
    const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight, 10); // this is used to calculuate the lineHeight property of the textArea, 
    const cursorY = (lineNumber - 1) * lineHeight; // this is first converted from 1 based cursor position to 0 based cursor position and then multiplied by lineHeight to find the px that in vertical position
    setCursorPosition(cursorY);
    console.log(window.getComputedStyle(textArea).width)
  };

  useEffect(()=>{
    console.log(window.getComputedStyle(hiddenSpanRef.current).width)
  }, [])

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
              mode === "light" ? "bg-gray-100 text-black" : "bg-black text-white"
            }`}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <textarea
            placeholder="Branch out your ideas..."
            className={`w-full h-96 p-2 ml-4 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light" ? "bg-gray-100 text-black" : "bg-black text-white"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={handleTextAreaInput}
            ref={textAreaRef}
            style={{ lineHeight: '24px' }} // height of each line of the text in the text area
          />
          <ToggleButton position={cursorPosition} />
        </div>

        <span ref={hiddenSpanRef} className="bg-primary whitespace-nowrap">this is a span and i</span>
      </div>
    </div>
  );
}

export default Branch;