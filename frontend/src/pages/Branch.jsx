import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./custom-quill.css"; // Import custom CSS
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import storage from "../utils/firebaseConf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageSrc, setImageSrc] = useState('');

  const quillRef = useRef(null); // Ref for Quill
  const hiddenSpan = useRef(null);

  // handle submition of post

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const handlePostSubmit = async (updatedContent) => {
    try {
      const cleanContent = DOMPurify.sanitize(updatedContent, {
        USE_PROFILES: { html: true },
      });

      console.log("Submitting content:", cleanContent); // Verify content here

      let imageUrl = ""

      if (imageSrc){
        const mimeType = getMimeTypeFromDataUrl(imageSrc);
        const blob = base64ToBlob(imageSrc, mimeType);
        imageUrl = await handleImageUpload(blob);
      }

      const res = await vkyreq("POST", "/posts", {
        heading: heading,
        body: cleanContent,
        tags: tags,
        img: imageUrl,
      });

      console.log(res.data);

      setHeading("");
      setContent("");
      setTags("");
    } catch (error) {
      console.log(error);
    }
  };

  // get MIME type from Data URL
  const getMimeTypeFromDataUrl = (dataUrl) => {
    // Split the data URL to get the MIME type part
    const mimeTypePart = dataUrl.split(";")[0];

    // Extract the MIME type
    const mimeType = mimeTypePart.split(":")[1];

    return mimeType;
  };

  // convert images in base64 to url by uploading on remote DB b4 saving
  const convertImageTags = async () => {
    try {
      const res = await vkyreq("get", "/users/me");
      if (hiddenSpan.current && res.data.data.username) {
        const imgTags = hiddenSpan.current.querySelectorAll("img");

        // Convert NodeList to Array and map over it
        const listOfImagesUploadedUrl = await Promise.all(
          Array.from(imgTags).map(async (imgTag) => {
            const dataUrl = imgTag.getAttribute("src");
            const mimeType = getMimeTypeFromDataUrl(dataUrl);
            const blob = base64ToBlob(dataUrl, mimeType);
            return handleImageUpload(blob, res.data.data.username);
          })
        );

        // Update the src attributes of the img tags
        imgTags.forEach((imgTag, index) => {
          imgTag.setAttribute("src", listOfImagesUploadedUrl[index]);
        });

        // Extract inner HTML excluding the <span> itself
        const innerHtml = hiddenSpan.current.innerHTML;
        console.log(innerHtml);

        // Set the content state with the updated HTML
        setContent(innerHtml);
        handlePostSubmit(innerHtml);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Convert Base64 data to Blob
  const base64ToBlob = (dataUrl, mimeType) => {
    const base64 = dataUrl.split(",")[1];
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  // Handle image upload
  const handleImageUpload = async (blob, username) => {
    try {
      const storageRef = ref(
        storage,
        `blogs/${username}/${generateRandomString(16)}`
      );
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  // handle file change for uploading cover image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
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
      },
    }),
    []
  );

  useEffect(
    () => console.log("this is the updated content : " + content),
    [content]
  );

  return (
    <div
      className={`duration-200 transition-colors ${
        mode === "light" ? "text-black bg-gray-100" : "text-white bg-priDark"
      } min-h-screen pb-6`}
    >
      <div className="flex items-center justify-between ml-2 mr-2 md:ml-10 md:mr-10 pt-4">
        <HiArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <button
          className="bg-primary text-white px-3 py-1 rounded-xl md:text-2xl"
          onClick={convertImageTags}
        >
          Branch
        </button>
      </div>
      <div className="relative mt-4 ml-2 mr-2 md:ml-10 md:mr-10 text-sm pb-10 full-screen-editor">
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="Branch heading..."
            className={`w-full md:text-3xl p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black"
                : "bg-priDark text-white"
            }`}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="text-xl mb-2">
          <input
            type="text"
            placeholder="tags heading..."
            className={`w-full p-2 md:text-xl rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black"
                : "bg-priDark text-white"
            }`}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-2 md:mb-5">
          {imageSrc && <img className="" src={imageSrc}/>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="file-input"
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Select Cover Image
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-4 relative sticky-toolbar">
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            className="text-xl h-72 lg:h-96 mb-6"
          />
        </div>
        <span
          dangerouslySetInnerHTML={{ __html: content }}
          className="hidden"
          ref={hiddenSpan}
        />
      </div>
    </div>
  );
}

export default Branch;
