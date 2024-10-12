import { useContext, useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { vkyreq } from "../../utils/vkyreq";
import ReactQuill from "react-quill";
import { ModeContext, UserContext } from "../../main";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Comment({ id }) {
  const { mode } = useContext(ModeContext);
  const { user } = useContext(UserContext);
  const [listOfComments, setListOfComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const getComments = async () => {
      try {
        const getAllComments = await vkyreq("GET", `/posts/${id}/comments`);
        setListOfComments(getAllComments.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      await vkyreq("POST", `/posts/${id}/comments`, { text: commentText });
      toast.success("Comment Posted successfully");
      setCommentText(""); // Clear the comment input after submission
      // Optionally, refetch comments here to update the UI
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <h1
          className={`text-xl ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Loading comments...
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`items-start p-4 border-b ${
        mode === "light" ? "bg-gray-100 text-priDark " : "bg-priDark text-white"
      } duration-200 pb-6`}
    >
      {user && (
        <>
          <ReactQuill
            value={commentText}
            onChange={setCommentText}
            placeholder="Write a comment..."
            className={`mb-4 rounded-md ${
              mode === "dark"
                ? "bg-gray-700 text-white border border-gray-600"
                : "bg-gray-100 text-black border border-gray-300"
            }`}
          />
          <button
            onClick={handleCommentSubmit}
            className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition duration-200 ${
              mode === "dark" ? "hover:bg-blue-700" : ""
            }`}
          >
            Submit
          </button>
        </>
      )}
      {listOfComments.map((ele, index) => (
        <div className="flex my-2" key={ele._id}>
          <img
            src={ele.user && ele.user.img ? ele.user.img : profile}
            alt="Profile"
            className="h-8 w-8 rounded-full mr-3"
          />
          <div className="flex flex-col flex-1">
            <div className="flex items-center mb-1">
              <span className="text-sm font-semibold">
                {ele.user ? ele.user.username : "Unknown User"}
              </span>
            </div>
            <div
              className={`text-sm mb-1 ${
                mode === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {ele.text}
            </div>
            {index < listOfComments.length - 1 && (
              <hr className="border-gray-300" />
            )}
          </div>
        </div>
      ))}

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

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Comment;
