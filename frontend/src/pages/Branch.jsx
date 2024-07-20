import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./custom-quill.css"; // Import custom CSS
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import Quill from "quill";

// Define and register custom blots
const Block = Quill.import("blots/block");

class CustomH1Blot extends Block {
  static create(value) {
    let node = super.create(value);
    node.classList.add("ql-h1");
    return node;
  }
}

CustomH1Blot.blotName = "header1";
CustomH1Blot.tagName = "h1";

class CustomH2Blot extends Block {
  static create(value) {
    let node = super.create(value);
    node.classList.add("ql-h2");
    return node;
  }
}

CustomH2Blot.blotName = "header2";
CustomH2Blot.tagName = "h2";

class CustomPreBlot extends Block {
  static create(value) {
    let node = super.create(value);
    node.classList.add("ql-pre");
    return node;
  }
}

CustomPreBlot.blotName = "pre";
CustomPreBlot.tagName = "pre";

class CustomCodeBlot extends Block {
  static create(value) {
    let node = super.create(value);
    node.classList.add("ql-code");
    return node;
  }
}

CustomCodeBlot.blotName = "code";
CustomCodeBlot.tagName = "code";

Quill.register(CustomH1Blot, true);
Quill.register(CustomH2Blot, true);
Quill.register(CustomPreBlot, true);
Quill.register(CustomCodeBlot, true);



function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const quillRef = useRef(null); // Ref for Quill

  // handle submition of post

  const handlePostSubmit = async () => {
    try {
      // const cleanContent = DOMPurify.sanitize(content, {
      //   USE_PROFILES: { html: true },
      // });
      const res = await vkyreq("POST", "/posts", {
        heading: heading,
        body: content,
        tags: tags,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.url; // Return the URL of the uploaded image
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
