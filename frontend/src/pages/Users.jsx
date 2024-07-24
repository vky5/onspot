import MainSection from "../components/Profile/MainSection";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { vkyreq } from "../utils/vkyreq";
import { ModeContext } from "../main";

function Users() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  const {mode} = useContext(ModeContext);

  useEffect(() => {
    const handleComponentMount = async () => {
      try {
        const res = await vkyreq("get", `/users/${id}`);
        console.log(res.data.data);
        setUserData(res.data.data); // Set the fetched data to userData state
      } catch (error) {
        console.log(error);
      }
    };

    handleComponentMount(); // Call the function to fetch data
  }, [id]); // Add id as a dependency to refetch when it changes

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } pb-6 duration-200 min-h-screen`}
    >
      <MainSection userData={userData} />

      <div>
        
      </div>
    </div>
  );
}

export default Users;
