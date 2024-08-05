import { HiArrowLeft } from "react-icons/hi";
import { useContext, useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModeContext } from "../main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./custom-quill.css"; // Import custom CSS
import { vkyreq } from "../utils/vkyreq";
import DOMPurify from "dompurify";
import storage from "../utils/firebaseConf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { generateRandomString } from "../utils/generateRandomString";
import { getMimeTypeFromDataUrl } from "../utils/getMimeTypeFromDataUrl";
import { base64ToBlob } from "../utils/base64toBlob";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function Branch() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInputField, setTagsInputField] = useState("");
  const quillRef = useRef(null); // Ref for Quill
  const hiddenSpan = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const getPostToUpdate = async () => {
      try {
        const res = await vkyreq("GET", `/posts/${id}/info`);
        if (res.data && res.data.data && id) {
          const decodedContent = decodeHTML(res.data.data.body);
          const sanitizedContent = DOMPurify.sanitize(decodedContent);
          setContent(sanitizedContent);
          setTags(res.data.data.tags);
          setHeading(res.data.data.heading);
          setImageSrc(res.data.data.img);
        } else {
          console.warn("No data found for the blog.");
        }
      } catch (error) {
        setContent("");
        setTags([]);
        setHeading("");
        setImageSrc("");
        console.error("Error fetching blog:", error);
      }
    };

    getPostToUpdate();
  }, [id]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagsInputField.trim()) {
      e.preventDefault();
      setTags([...tags, tagsInputField.trim()]);
      setTagsInputField(""); // Clear the input field after adding a tag
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePostSubmit = async (updatedContent) => {
    try {
      const cleanContent = DOMPurify.sanitize(updatedContent, {
        USE_PROFILES: { html: true },
      });

      let imageUrl = "";

      if (imageSrc && !imageSrc.startsWith('http')){
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
      setTags([]);
      setImageSrc("");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostUpdate = async (updatedContent) => {
    try {
      const cleanContent = DOMPurify.sanitize(updatedContent, {
        USE_PROFILES: { html: true },
      });

      let imageUrl = "";

      if (imageSrc) {
        const mimeType = getMimeTypeFromDataUrl(imageSrc);
        const blob = base64ToBlob(imageSrc, mimeType);
        imageUrl = await handleImageUpload(blob);
      }

      const res = await vkyreq("PATCH", `/posts/${id}/info`, {
        heading: heading,
        body: cleanContent,
        tags: tags,
        img: imageUrl,
      });

      console.log(res.data);

      setHeading("");
      setContent("");
      setTags([]);
      setImageSrc("");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
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
            if (dataUrl && !dataUrl.startsWith("http")) {
              const mimeType = getMimeTypeFromDataUrl(dataUrl);
              const blob = base64ToBlob(dataUrl, mimeType);

              if (blob) {
                return handleImageUpload(blob, res.data.data.username);
              } else {
                console.error("Error converting Base64 data URL to Blob");
                return ""; // Fallback URL or empty string if blob conversion fails
              }
            } else {
              // If it's already a URL, just return it
              return dataUrl;
            }
          })
        );

        // Update the src attributes of the img tags
        imgTags.forEach((imgTag, index) => {
          imgTag.setAttribute("src", listOfImagesUploadedUrl[index]);
        });

        // Extract inner HTML excluding the <span> itself
        const innerHtml = hiddenSpan.current.innerHTML;
        // Set the content state with the updated HTML
        setContent(innerHtml);
        if (!id) {
          handlePostSubmit(innerHtml);
        } else {
          console.log("we are here");
          handlePostUpdate(innerHtml);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
        {(!id && (
          <button
            className="bg-primary text-white px-3 py-1 rounded-xl md:text-2xl"
            onClick={convertImageTags}
          >
            Branch
          </button>
        )) || (
          <button
            className="bg-primary text-white px-3 py-1 rounded-xl md:text-2xl"
            onClick={convertImageTags}
          >
            Update
          </button>
        )}
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
        <div className="text-sm md:text-xl mb-2">
          <input
            type="text"
            placeholder="tags... Press enter key"
            className={`w-full p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              mode === "light"
                ? "bg-gray-100 text-black text-sm md:text-xl" // Adjusted text size for different modes
                : "bg-priDark text-white text-sm md:text-xl"
            }`}
            value={tagsInputField}
            onChange={(e) => setTagsInputField(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-wrap gap-3 mt-2 mb-6">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-500 px-2 py-1 rounded-xl text-sm md:text-xl flex-shrink-0"
              >
                <button
                  className="text-red-500 hover:text-red-700 text-sm md:text-xl"
                  onClick={() => removeTag(index)}
                >
                  &times;
                </button>
                <span className="tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2 md:mb-5">
          {imageSrc && <img className="" src={imageSrc} />}
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
