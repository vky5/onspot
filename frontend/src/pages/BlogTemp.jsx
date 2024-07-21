import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { useLocation } from "react-router-dom";
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import formatDateToMonthDay from "../utils/formatDateToMonthDay";
import "./BlogTemp.css";
import { IoHeartSharp } from "react-icons/io5";
import 'react-quill/dist/quill.snow.css'; // Ensure Quill styles are imported

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function BlogTemp() {
  const { mode } = useContext(ModeContext);
  const location = useLocation();
  const [body, setBody] = useState({});
  const [user, setUser] = useState({});

  const { id } = location.state || {};

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await vkyreq("GET", `/posts/${id}/info`);

        if (res.data && res.data.data) {
          // Decode HTML entities
          console.log("Fetched blog data:", res.data.data);
          const decodedContent = decodeHTML(res.data.data.body);

          // Sanitize HTML content
          const sanitizedContent = DOMPurify.sanitize(decodedContent);

          setBody({
            content: sanitizedContent,
            like: res.data.data.like,
            tags: res.data.data.tags,
            heading: res.data.data.heading,
            date: res.data.data.date,
            img: res.data.data.img || "",
          });

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

  const formattedDate = body.date ? formatDateToMonthDay(body.date) : "";

  return (
    <div
      className={`${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-priDark"
      } duration-200 min-h-screen pb-6`}
    >
      <div className="content-container ml-2 mr-2 pt-5 md:ml-10 md:mr-10">
        <div>{body.tags}</div>
        <div className="text-3xl mt-4 lg:text-4xl">{body.heading}</div>
        <div className="flex justify-between">
          <span className="mt-3 lga:text-xl">
            <span>{formattedDate}</span> by <span className="text-primary font-semibold">{user.username}</span>
          </span>{" "}
          <span className="flex items-center">
            <span className="text-xs lg:text-lg">{body.like}</span>
            <IoHeartSharp className="h-6 w-6 lg:h-8 lg:w-8 rounded-full text-primary lg:ml-3 sm:ml-2 ml-1" />
          </span>
        </div>
      </div>
      <div className="image-container mt-3">
        <img
          className="h-64 md:h-96 w-full object-cover"
          src={body.img || "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        />
      </div>
      <div className="content-container ml-2 mr-2">
        <div className="text-sm  mt-5 quill-content ql-editor">
          {body.content ? (
            <div dangerouslySetInnerHTML={{ __html: body.content }} />
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogTemp;
