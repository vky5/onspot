import { useContext, useEffect, useState, useRef } from "react";
import { ModeContext, UserContext } from "../main";
import { useParams } from "react-router-dom";
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import formatDateToMonthDay from "../utils/formatDateToMonthDay";
import "./BlogTemp.css";
import { IoHeartSharp } from "react-icons/io5";
import "react-quill/dist/quill.snow.css"; // Ensure Quill styles are imported
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function encodeHeading(headingText) {
  return encodeURIComponent(headingText.replace(/\s+/g, "-").toLowerCase());
}

function BlogTemp() {
  const { mode } = useContext(ModeContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const { id } = useParams(); // Use useParams to get the ID from the URL
  const [body, setBody] = useState({});
  const [user, setUser] = useState({});
  const [headings, setHeadings] = useState([]);
  const [deleteStat, setDelStat] = useState(0);
  const [likeState, setLike] = useState(0);

  const cancelConfirmRef = useRef(null);

  const updateLikeOfCard = async (e) => {
    e.stopPropagation();
    try {
      const res = await vkyreq("PATCH", `/posts/${id}/likes`);
      if (res.data.counter === 1) {
        setLike((curr) => curr + 1);
      } else {
        setLike((curr) => curr - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      if (!id) {
        console.error("Blog ID is undefined.");
        return;
      }

      try {
        const res = await vkyreq("GET", `/posts/${id}/info`);

        if (res.data && res.data.data) {
          const decodedContent = decodeHTML(res.data.data.body);
          const sanitizedContent = DOMPurify.sanitize(decodedContent);

          // Extract headings and add IDs
          const headingElements =
            sanitizedContent.match(/<h([1-2])[^>]*>(.*?)<\/h[1-2]>/g) || [];
          const headingList = headingElements.map((heading) => {
            const text = heading.replace(/<\/?[^>]+>/g, ""); // Remove HTML tags
            const id = encodeHeading(text); // Generate URL-safe ID
            return { text, id };
          });
          setHeadings(headingList);

          // Add IDs to headings in sanitized content
          const contentWithIds = headingElements.reduce((content, heading) => {
            const text = heading.replace(/<\/?[^>]+>/g, ""); // Remove HTML tags
            const id = encodeHeading(text); // Generate URL-safe ID
            return content.replace(
              heading,
              heading.replace(/<h([1-2])/, `<h$1 id="${id}"`)
            );
          }, sanitizedContent);

          setBody({
            content: contentWithIds,
            like: res.data.data.like,
            tags: res.data.data.tags,
            heading: res.data.data.heading,
            date: res.data.data.date,
            img: res.data.data.img || "",
          });

          setLike(res.data.data.like);

          setUser({
            username: res.data.data.user.username,
            img: res.data.data.user.img,
          });
        } else {
          console.warn("No data found for the blog.");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    getBlog();
  }, [id]);

  useEffect(() => {
    // Scroll to the heading based on hash in URL
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`No element found for hash: ${hash}`);
      }
    }
  }, [body.content]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cancelConfirmRef.current &&
        !cancelConfirmRef.current.contains(event.target) &&
        !event.target.closest(".bg-red-800") // Exclude the confirm button
      ) {
        setDelStat(0);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedDate = body.date ? formatDateToMonthDay(body.date) : "";

  const deletePost = async () => {
    try {
      await vkyreq("delete", `/posts/${id}/info`);
      navigate(-1);
    } catch (error) {
      console.log("Something went wrong : " + error);
    }
  };

  return (
    <div
      className={`${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-priDark"
      } duration-200 min-h-screen pb-6`}
    >
      <div className="content-container ml-2 mr-2 pt-5 md:ml-10 md:mr-10">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-3 mt-2 mb-6 text-white">
            {body.tags?.map((tag, index) => (
              <span
                className="flex items-center bg-primary px-2 py-1 rounded-xl text-sm md:text-xl"
                key={index}
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
          {userData.username === user.username && (
            <>
              <span
                className={`md:text-2xl lg:text-3xl space-x-5 lg:space-x-8 ${
                  deleteStat === 1 ? "hidden" : "flex"
                }`}
                onClick={() => {}}
              >
                <FaPencilAlt
                  className="hover:cursor-pointer"
                  onClick={() => navigate(`/branch/${id}`)}
                />{" "}
                <FaTrash
                  className="hover:cursor-pointer text-red-800"
                  onClick={() => setDelStat(1)}
                />
              </span>
              <span
                className={`${
                  deleteStat === 0 ? "hidden" : "flex"
                } space-x-5 lg:space-x-8`}
              >
                <button
                  className="flex items-center py-1 px-2 rounded-xl text-sm md:text-xl border border-primary text-primary"
                  ref={cancelConfirmRef}
                  onClick={() => setDelStat(0)}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-red-800 px-2 py-1 rounded-xl text-sm md:text-xl"
                  onClick={deletePost}
                >
                  Confirm
                </button>
              </span>
            </>
          )}
        </div>

        <div className="text-3xl mt-4 lg:text-4xl">{body.heading}</div>
        <div className="flex justify-between">
          <span className="mt-3 lga:text-xl">
            <span>{formattedDate}</span> by{" "}
            <span className="text-primary font-semibold">{user.username}</span>
          </span>{" "}
          <span className="flex items-center" onClick={updateLikeOfCard}>
            <span className="text-xs lg:text-lg">{likeState}</span>
            <IoHeartSharp className="h-6 w-6 lg:h-8 lg:w-8 rounded-full text-primary lg:ml-3 sm:ml-2 ml-1" />
          </span>
        </div>
      </div>
      <div className="image-container mt-3">
        <img
          className="h-64 md:h-96 w-full object-cover"
          src={
            body.img ||
            "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      <div className="content-container ml-2 mr-2 flex">
        <div
          className={`text-sm mt-5 quill-content ql-editor ${
            headings.length === 0 ? "text-center w-full" : "md:w-[65%]"
          }`}
        >
          {body.content ? (
            <div dangerouslySetInnerHTML={{ __html: body.content }} />
          ) : (
            <p>No content available.</p>
          )}
        </div>
        {headings.length !== 0 && (
          <div className="w-full md:w-1/3 p-4 hidden md:block">
            <div className="sticky top-0">
              <h2 className="text-3xl font-bold text-center mb-5">Contents</h2>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-blue-500 hover:underline text-2xl"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                          window.history.pushState(null, "", `#${heading.id}`);
                        }
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogTemp;
