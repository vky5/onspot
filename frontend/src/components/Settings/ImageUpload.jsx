import  { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; // Ensure you import your Firebase storage config

const UserProfile = ({ mode }) => {
  const [userObj, setUserObj] = useState({
    username: 'exampleUser',
    img: '',
  });

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
      toast.success('Image uploaded successfully!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again later.', {
        position: 'bottom-right',
      });
    }
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
        mode === 'light' ? 'bg-gray-100 text-black' : 'bg-priDark text-white'
      } duration-200 pb-6 min-h-screen px-5 flex flex-col items-center`}
    >
      <ToastContainer />
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
          style={{ display: 'none' }}
          id="fileInput"
        />
        <FaPlus
          onClick={() => document.getElementById('fileInput').click()}
          className={`absolute bottom-5 right-3 text-xl cursor-pointer p-1 rounded-full shadow-md duration-200 ${
            mode === 'light' ? ' bg-gray-100' : ' bg-priDark'
          } text-primary`}
        />
      </div>
    </div>
  );
};

export default UserProfile;

// Helper function to generate random string
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
