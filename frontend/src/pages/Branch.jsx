import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./custom-quill.css"; // Import custom CSS
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import storage from '../utils/firebaseConf';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'


function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");


  const quillRef = useRef(null); // Ref for Quill

  // handle submition of post


const generateRandomString = (length) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

  const handlePostSubmit = async () => {
    try {
      const cleanContent = DOMPurify.sanitize(content, {
        USE_PROFILES: { html: true },
      });
      const res = await vkyreq("POST", "/posts", {
        heading: heading,
        body: cleanContent,
        tags: tags,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return null;
    // since it is always a good practice to validate user b4 updating DB,
    try {
      const res = await vkyreq('get', '/users/me')
      const storageRef = ref(storage, `blogs/${res.data.data.username}/${generateRandomString(16)}`)
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      return url;
    
    } catch (error) {
      console.log(error)
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
          [{ align: [] }],
          ["link", "image", "code-block"], // Add code block button here
          ["clean"],
        ],
        handlers: {
          image: async () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", async () => {
              const file = input.files[0];
              if (file) {
                const imageUrl = await handleImageUpload(file);
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", imageUrl);
              }
            });

            input.click();
          },
        },
      },
    }),
    []
  );

  return (
    <div
      className={`duration-200 transition-colors ${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-black"
      }`}
    >
      <div className="flex items-center justify-between pl-5 pr-5 pt-7">
        <HiArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <button
          className="bg-primary text-white px-3 py-1 rounded-xl"
          onClick={handlePostSubmit}
        >
          Branch
        </button>
      </div>
      <div className="relative mt-8 ml-8 mr-8 text-sm pb-10 full-screen-editor">
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="Branch heading..."
            className={`w-full p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black"
                : "bg-black text-white"
            }`}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="tags heading..."
            className={`w-full p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black"
                : "bg-black text-white"
            }`}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-4 relative sticky-toolbar">
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            className="text-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Branch;
