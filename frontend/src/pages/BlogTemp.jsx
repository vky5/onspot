import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { useLocation } from "react-router-dom";
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import formatDateToMonthDay from "../utils/formatDateToMonthDay";
import "./BlogTemp.css";
import { IoHeartSharp } from "react-icons/io5";

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
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-black"
      } duration-200`}
    >
      <div className="ml-2 mr-2 pt-5">
        {/* this div is to display tags that are saved in the DB need to render them nicely */}
        <div>{body.tags}</div>

        {/* for heading of the blog should be bigger than all other texts */}
        <div className="text-3xl">{body.heading}</div>

        {/* for basic info about blog like date on which it is published by who and number of likes */}
        <div className="flex justify-between">
          <span>
            <span>{formattedDate}</span> by <span className="text-primary font-semibold">{user.username}</span>
          </span>{" "}
          {/* this is for displaying likes and heart icon.  */}
          <span className="flex items-center ">
            <span className="text-xs lg:text-lg">{body.like}</span>
            <IoHeartSharp className="h-6 w-6 lg:h-8 lg:w-8 rounded-full text-primary lg:mr-2 sm:mr-1" />
          </span>
        </div>

        {/* this is to add image if the image exist. The image should be across the page */}
        <div>
          <img src={body.img || "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  />
        </div>

        {/* to save the content stored in DB */}
        <div className="text-sm">
          <div dangerouslySetInnerHTML={{ __html: body.content }} />
        </div>
      </div>
    </div>
  );
}

export default BlogTemp;
