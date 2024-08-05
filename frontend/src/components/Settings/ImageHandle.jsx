import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import profile from "../../assets/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageHandle = ({ mode, img, handleUpdate }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please select a JPEG, PNG, or GIF image.",
          {
            position: "bottom-right",
          }
        );
        return;
      }

      if (file.size > maxSize) {
        toast.error(
          "File size too large. Please select an image smaller than 5MB.",
          {
            position: "bottom-right",
          }
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        handleUpdate((prevState) => ({
          ...prevState,
          img: blob,
        }));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="">
      <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-60 lg:h-60 rounded-full overflow-hidden mb-4">
        <img src={img instanceof Blob ? URL.createObjectURL(img) : img || profile} alt="Profile" className="w-full h-full object-cover" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <FaPlus
          onClick={() => document.getElementById("fileInput").click()}
          className={`absolute bottom-5 right-3 text-xl cursor-pointer p-1 rounded-full shadow-md duration-200 ${
            mode === "light" ? " bg-gray-100" : " bg-priDark"
          } text-primary`}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

ImageHandle.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  img: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Blob)])
    .isRequired,
};

export default ImageHandle;
