import { FiPlus, FiX, FiCamera } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

function ToggleButton({ position }) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);

  const toggleButton = () => {
    if (active) {
      setTimeout(() => setActive(false), 300);
      setVisible(false);
    } else {
      setVisible(true);
      setActive(true);
    }
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setTimeout(() => setActive(false), 300);
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className="absolute"
      style={{ top: position, left: -30 }} // Adjust `left` as needed
    >
      <button
        className="border-2 border-primary rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-transform duration-300 ease-in-out"
        onClick={toggleButton}
      >
        {active ? (
          <FiX className="h-6 w-6 text-primary" />
        ) : (
          <FiPlus className="h-6 w-6 text-primary" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          visible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}
      >
        {active && (
          <div className="pt-2 space-y-2">
            <button
              className="border-2 border-primary rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-transform duration-300 ease-in-out"
            >
              <div className="h-6 w-6 text-primary">{"{/}"}</div>
            </button>
            <button
              className="border-2 border-primary rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-transform duration-300 ease-in-out"
            >
              <FiCamera className=" text-primary" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleButton;
