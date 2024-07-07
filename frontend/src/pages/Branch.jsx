import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useRef } from "react";
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

  const handleTextAreaInput = (event) => {
    const textArea = event.target;
    const { selectionStart, value } = textArea;
    const textBeforeCursor = value.substring(0, selectionStart);
    const linesBeforeCursor = textBeforeCursor.split('\n');
    const lineNumber = linesBeforeCursor.length;
    const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight, 10);
    const cursorY = (lineNumber - 1) * lineHeight;
    setCursorPosition(cursorY);
  };

  return (
    <div
      className={`duration-200 ${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-black"
      }`}
    >
      <div className="flex items-center justify-between pl-5 pr-5 pt-7">
        <HiArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <button className="bg-primary text-white px-3 py-1 rounded-xl">
          Save
        </button>
      </div>
      <div className="relative mt-8 ml-8 mr-8 text-sm pb-10">
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="Branch heading..."
            className={`w-full p-2 rounded-md focus:outline-none ${
              mode === "light" ? "bg-gray-100" : "bg-black"
            }`}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <textarea
            placeholder="Branch out your ideas..."
            className={`w-full h-96 p-2 rounded-md focus:outline-none ${
              mode === "light" ? "bg-gray-100" : "bg-black"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={handleTextAreaInput}
            ref={textAreaRef}
            style={{ lineHeight: '24px' }} // Ensure this matches with your CSS
          />
          <ToggleButton position={cursorPosition} />
        </div>
      </div>
    </div>
  );
}

export default Branch;
