import { useContext, useEffect, useState, useRef } from "react";
import { vkyreq } from "../utils/vkyreq";
import profile from "../assets/profile.png";
import { ModeContext } from "../main";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../utils/firebaseConf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Settings() {
  const [userObj, setUserObj] = useState({
    img: profile,
    about: "",
    social: {
      linkdin: "",
      github: "",
      twitter: "",
    },
    email: "",
    name: "",
  });

  const [username, setUsername] = useState("");
  const [passObj, setPassObj] = useState({
    password: "",
    newPassword: "",
  });

  const [activeTextarea, setActiveTextarea] = useState(false);

  const { mode } = useContext(ModeContext);
  const containerRef = useRef(null);

  const updateDetails = async () => {
    try {
      // Update user details
      await vkyreq("PATCH", "/users/updateme", userObj);
      toast.success("Details updated successfully!");

      // Update password

      if (passObj.newPassword !== "") {
        const res = await vkyreq("PATCH", "/auth/updatepassword", passObj);

        // Check response status or data
        if (res.success) {
          // Adjust based on actual response structure
          toast.success("Password updated successfully!");
        } else {
          toast.error("Failed to update password. Please check your input.");
        }
      }
    } catch (error) {
      if (error.response) {
        // Accessing response details
        const { status, data } = error.response;

        if (status === 401) {
          toast.error(
            data.message ||
              "Unauthorized access. Please check your credentials."
          );
        } else {
          toast.error(
            data.message || "Failed to update details. Please try again later."
          );
        }
      } else {
        // Handle network errors or other issues
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const handleImageUpload = async (blob) => {
    try {
      const storageRef = ref(
        storage,
        `pfp/${userObj.username}/${generateRandomString(16)}`
      );
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setUserObj((prevState) => ({
        ...prevState,
        img: url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveTextarea(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await vkyreq("get", "/users/me");
        const { img, about, social, email, name, username } = res.data.data;
        setUsername(username);

        setUserObj({
          img: img || profile,
          about: about || "",
          social: {
            linkdin: social?.linkdin || "",
            github: social?.github || "",
            twitter: social?.twitter || "",
          },
          email: email || "",
          name: name || "",
        });
      } catch (error) {
        console.log("Something went wrong: " + error);
      }
    };

    getDetails();
  }, []);

  useEffect(() => console.log(passObj), [passObj]);

  const handleSocialChange = (platform, value) => {
    setUserObj((prevState) => ({
      ...prevState,
      social: {
        ...prevState.social,
        [platform]: value,
      },
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen px-5 flex flex-col items-center`}
    >
      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4">
        <img
          src={userObj.img}
          alt="Profile"
          className="w-full h-full object-cover"
        />
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

      <div className="text-2xl">{username}</div>

      <button
        className="bg-primary text-white px-3 py-1 rounded-xl md:text-2xl mt-6"
        onClick={updateDetails}
      >
        Save
      </button>
      <div className="mt-3 w-full">
        <span className="text-xl">Name</span>
        <input
          type="text"
          className={`w-full p-2 rounded border ${
            mode === "light"
              ? "bg-gray-100 text-black border-gray-800"
              : "bg-priDark text-white border-gray-300"
          } duration-200 text-sm mt-2`}
          value={userObj.name}
          onChange={(e) =>
            setUserObj((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-3 w-full">
        <span className="text-xl">Email</span>
        <input
          type="text"
          className={`w-full p-2 rounded border ${
            mode === "light"
              ? "bg-gray-100 text-black border-gray-800"
              : "bg-priDark text-white border-gray-300"
          } duration-200 text-sm mt-2`}
          value={userObj.email}
          onChange={(e) =>
            setUserObj((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-3 w-full">
        <span className="mt-2 text-xl">Current Password</span>
        <input
          type="password"
          className={`w-full p-2 rounded border ${
            mode === "light"
              ? "bg-gray-100 text-black border-gray-800"
              : "bg-priDark text-white border-gray-300"
          } duration-200 text-sm mt-2`}
          value={passObj.password}
          onChange={(e) =>
            setPassObj((prevState) => {
              return {
                ...prevState,
                password: e.target.value,
              };
            })
          }
          placeholder="Current Password"
        />
      </div>
      <div className="mt-3 w-full">
        <span className="pt-3 text-xl">New Password</span>
        <input
          type="password"
          className={`w-full p-2 rounded border ${
            mode === "light"
              ? "bg-gray-100 text-black border-gray-800"
              : "bg-priDark text-white border-gray-300"
          } duration-200 text-sm mt-2`}
          value={passObj.newPassword}
          onChange={(e) =>
            setPassObj((prevState) => {
              return {
                ...prevState,
                newPassword: e.target.value,
              };
            })
          }
          placeholder="New Password"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mt-3 text-xl flex">
          <div className="flex items-center">
            <span>About me</span>
            {(!activeTextarea && (
              <FaPencilAlt
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setActiveTextarea(true)}
              />
            )) || (
              <FaTimes
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setActiveTextarea(false)}
              />
            )}
          </div>
        </div>

        <div ref={containerRef} className="w-full max-w-md">
          {!activeTextarea && (
            <div
              className={`${
                userObj.about === "" ? "text-gray-500 text-center" : "text-left"
              } ${
                mode === "light" ? "border-gray-800" : "border-gray-300"
              } border py-2 rounded mt-2 text-sm px-2`}
            >
              {userObj.about === "" ? "Tell us about yourself" : userObj.about}
            </div>
          )}
          {activeTextarea && (
            <textarea
              name="about"
              id="about"
              className={`w-full p-2 rounded border ${
                mode === "light"
                  ? "bg-gray-100 text-black border-gray-800"
                  : "bg-priDark text-white  border-gray-300"
              } duration-200 text-sm mt-2 h-64`}
              value={userObj.about}
              onChange={(e) =>
                setUserObj((prevState) => ({
                  ...prevState,
                  about: e.target.value,
                }))
              }
            />
          )}
        </div>

        {/* For contact me section */}
        <div className="text-xl mt-3">Contact me</div>
        <section className="space-y-4 lg:space-y-0 lg:space-x-8 mt-2 w-full max-w-md">
          <div className="flex items-center space-x-3">
            <FaTwitter className="text-blue-500 text-2xl" />
            <input
              type="url"
              className={`w-full p-2 rounded border ${
                mode === "light"
                  ? "bg-gray-100 text-black border-gray-800"
                  : "bg-priDark text-white border-gray-300"
              } duration-200 text-sm`}
              value={userObj.social.twitter}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="Twitter URL"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaLinkedin className="text-blue-700 text-2xl" />
            <input
              type="url"
              className={`w-full p-2 rounded border ${
                mode === "light"
                  ? "bg-gray-100 text-black border-gray-800"
                  : "bg-priDark text-white border-gray-300"
              } duration-200 text-sm`}
              value={userObj.social.linkdin}
              onChange={(e) => handleSocialChange("linkdin", e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaGithub className="text-gray-800 text-2xl" />
            <input
              type="url"
              className={`w-full p-2 rounded border ${
                mode === "light"
                  ? "bg-gray-100 text-black border-gray-800"
                  : "bg-priDark text-white border-gray-300"
              } duration-200 text-sm`}
              value={userObj.social.github}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              placeholder="GitHub URL"
            />
          </div>
        </section>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Settings;
