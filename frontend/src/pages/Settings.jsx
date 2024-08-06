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
import { UserContext, LoggedInContext } from "../main";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../utils/firebaseConf";
import { generateRandomString } from "../utils/generateRandomString";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/Cookies";

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

  const navigate = useNavigate();

  const {setLoggedin} = useContext(LoggedInContext);

  const { mode } = useContext(ModeContext);
  const { setUserData } = useContext(UserContext);

  const updatePasswd = async () => {
    if (passObj.newPassword !== "") {
      try {
        const res = await vkyreq("PATCH", "/auth/updatepassword", passObj);
        if (res.success) {
          toast.success("Password updated successfully!");
        } else {
          toast.error("Failed to update password. Please check your input.");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            toast.error(
              data.message ||
                "Unauthorized access. Please check your credentials."
            );
          } else {
            toast.error(
              data.message ||
                "Failed to update details. Please try again later."
            );
          }
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    }
    const updatedUserObj = await handleImageUpload(userObj.img);
    await updateDetails(updatedUserObj);
  };

  const handleImageUpload = async (blob) => {
    console.log("Blob before upload:", blob);
    if (blob instanceof Blob) {
      try {
        const storageRef = ref(
          storage,
          `pfp/${username}/${generateRandomString(16)}`
        );
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        console.log("Uploaded image URL:", url);
        return new Promise((resolve) => {
          setUserObj((prevState) => {
            const updatedObj = {
              ...prevState,
              img: url,
            };
            console.log("Updated user object:", updatedObj);
            resolve(updatedObj); // Resolve the promise with the updated object
            return updatedObj;
          });
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("Blob is not a Blob instance, skipping upload");
    }
    return userObj;
  };

  const updateDetails = async (updatedUserObj) => {
    try {
      console.log(updatedUserObj);
      const res2 = await vkyreq("PATCH", "/users/updateme", updatedUserObj);
      setUserData(res2.data.data.user);
      toast.success("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
      if (error.response) {
        const { data } = error.response;

        toast.error(
          data.message || "Failed to update details. Please try again later."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const deleteAcc = async () => {
    try {
      await vkyreq('delete', "/users/deleteme");
      navigate('/');
      deleteCookie('jwt');
      setLoggedin(false);
    } catch (error) {
      console.log(error);
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
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);
  useEffect(() => console.log("User object image:", userObj.img), [userObj]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen px-5 flex flex-col md:flex-row md:justify-around md:pr-20`}
    >
      <div className="flex flex-col items-center md:mt-32 md:w-1/3">
        <ImageHandle mode={mode} handleUpdate={setUserObj} img={userObj.img} />
        <div className="text-2xl mt-4 lg:text-3xl">{username}</div>
      </div>

      <div className="flex flex-col items-center md:w-2/3">
        <button
          className="bg-primary text-white px-3 py-1 text-left rounded-xl md:text-2xl mt-6"
          onClick={updatePasswd}
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

        <Socials
          mode={mode}
          handleChange={setUserObj}
          socials={userObj.social}
        />

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
        <button
          className="bg-red-800 mt-10 text-white px-3 py-1 rounded-xl md:text-2xl"
          onClick={deleteAcc}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
