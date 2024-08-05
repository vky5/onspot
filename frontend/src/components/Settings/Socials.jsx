import PropTypes from "prop-types";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Socials = ({
  mode = 'light', // Default value for mode
  handleChange = () => {}, // Default no-op function
  socials = {} // Default empty object for socials
}) => {

  const handleSocialChange = (platform, value) => {
    handleChange((prevState) => ({
      ...prevState,
      social: {
        ...prevState.social,
        [platform]: value,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="text-xl mt-3 md:text-2xl">Contact me</div>
      <section className="space-y-4 mt-2 w-full md:space-y-6 lg:space-y-0 lg:flex lg:items-start lg:space-x-6">
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
          <FaTwitter className="text-blue-500 text-2xl md:text-3xl" />
          <input
            type="url"
            className={`w-full p-2 h-10 rounded border ${
              mode === "light"
                ? "bg-gray-100 text-black border-gray-800"
                : "bg-priDark text-white border-gray-300"
            } duration-200 text-sm md:text-lg lg:text-xl`}
            value={socials.twitter || ''}
            onChange={(e) => handleSocialChange("twitter", e.target.value)}
            placeholder="Twitter URL"
          />
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
          <FaLinkedin className="text-blue-700 text-2xl md:text-3xl" />
          <input
            type="url"
            className={`w-full p-2 h-10 rounded border ${
              mode === "light"
                ? "bg-gray-100 text-black border-gray-800"
                : "bg-priDark text-white border-gray-300"
            } duration-200 text-sm md:text-lg lg:text-xl`}
            value={socials.linkedin || ''}
            onChange={(e) => handleSocialChange("linkedin", e.target.value)}
            placeholder="LinkedIn URL"
          />
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
          <FaGithub className="text-gray-800 text-2xl md:text-3xl" />
          <input
            type="url"
            className={`w-full p-2 h-10 rounded border ${
              mode === "light"
                ? "bg-gray-100 text-black border-gray-800"
                : "bg-priDark text-white border-gray-300"
            } duration-200 text-sm md:text-lg lg:text-xl`}
            value={socials.github || ''}
            onChange={(e) => handleSocialChange("github", e.target.value)}
            placeholder="GitHub URL"
          />
        </div>
      </section>
    </div>
  );
};

Socials.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]),
  handleChange: PropTypes.func,
  socials: PropTypes.shape({
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
  }),
};

export default Socials;
