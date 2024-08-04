import { useContext, useEffect, useState } from "react";
import { vkyreq } from "../utils/vkyreq";
import profile from "../assets/profile.png";
import { ModeContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageHandle from "../components/Settings/ImageHandle";
import Socials from "../components/Settings/Socials";
import AboutMe from "../components/Settings/AboutMe";
import UpdateField from "../components/Settings/UpdateField";

function Settings() {
  const [userObj, setUserObj] = useState({
    img: "",
    about: "",
    social: {
      linkedin: "",
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
  const [loading, setLoading] = useState(true);

  const { mode } = useContext(ModeContext);

  const updateDetails = async () => {
    try {
      await vkyreq("PATCH", "/users/updateme", userObj);
      toast.success("Details updated successfully!");

      if (passObj.newPassword !== "") {
        const res = await vkyreq("PATCH", "/auth/updatepassword", passObj);

        if (res.success) {
          toast.success("Password updated successfully!");
        } else {
          toast.error("Failed to update password. Please check your input.");
        }
      }
    } catch (error) {
      if (error.response) {
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
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

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
            linkedin: social?.linkedin || "",
            github: social?.github || "",
            twitter: social?.twitter || "",
          },
          email: email || "",
          name: name || "",
        });
      } catch (error) {
        console.log("Something went wrong: " + error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the component if data is loaded
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen px-5 flex flex-col items-center`}
    >
      <ImageHandle
        mode={mode}
        username={username} // Correctly pass username
        handleUpdate={setUserObj} // Fixed prop name
        img={userObj.img}
      />

      <div className="text-2xl">{username}</div>

      <button
        className="bg-primary text-white px-3 py-1 rounded-xl md:text-2xl mt-6"
        onClick={updateDetails}
      >
        Save
      </button>
      <UpdateField
        mode={mode}
        toBeUpdated={userObj.name}
        type="text"
        heading="Name"
        fieldKey="name"
        handleChange={setUserObj}
      />

      <UpdateField
        mode={mode}
        toBeUpdated={userObj.email}
        type="text"
        heading="Email"
        fieldKey="email"
        handleChange={setUserObj}
      />

      <UpdateField
        mode={mode}
        toBeUpdated={passObj.password}
        type="password"
        heading="Current Password"
        fieldKey="password"
        handleChange={setPassObj}
      />

      <UpdateField
        mode={mode}
        toBeUpdated={passObj.newPassword}
        type="password"
        heading="New Password"
        fieldKey="newPassword"
        handleChange={setPassObj}
      />

      <AboutMe mode={mode} handleChange={setUserObj} about={userObj.about} />

      <Socials mode={mode} handleChange={setUserObj} socials={userObj.social} />

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
