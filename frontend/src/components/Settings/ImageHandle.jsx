import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../utils/firebaseConf";
import { generateRandomString } from "../../utils/generateRandomString";
import profile from '../../assets/profile.png';

const ImageHandle = ({ mode = 'light', username = '', handleUpdate = () => {}, img = profile }) => {
  const handleImageUpload = async (blob) => {
    try {
      const storageRef = ref(
        storage,
        `pfp/${username}/${generateRandomString(16)}`
      );
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      handleUpdate((prevState) => ({
        ...prevState,
        img: url,
      }));
      toast.success("Image uploaded successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again later.", {
        position: "bottom-right",
      });
    }
  };

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

      handleImageUpload(file);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4">
        <img src={img} alt="Profile" className="w-full h-full object-cover" />
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
      </div>
    </div>
  );
};

ImageHandle.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  username: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};

export default ImageHandle;
``
