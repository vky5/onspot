import PropTypes from "prop-types";
import profile from "../../assets/profile.png";
import { HiCog } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MainSection({ userData, isProfilePage = false }) {

  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center pt-5 md:ml-10 md:mr-10 w-full`}>
      <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-10">
        <div className="w-14 h-14 md:h-16 md:w-16 lg:h-32 lg:w-32 rounded-full">
          <img
            src={userData.img || profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col items-start space-y-1 md:space-y-2 text-center lg:text-left">
          <div>
            {userData.username}
          </div>
          <div>
            {userData.name}
          </div>
          <div>
            {userData.email}
          </div>
          <div className="mt-6">
            <div className="flex space-x-4 lg:space-x-8">
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-500 text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-700 text-2xl" />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-800 text-2xl" />
              </a>
            </div>
          </div>
        </div>
        {isProfilePage && (
          <div className="ml-4">
            <HiCog
              className={`text-2xl md:text-3xl lg:text-4xl cursor-pointer`}
              onClick={() => navigate('/profile/settings')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

MainSection.propTypes = {
  userData: PropTypes.shape({
    img: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  isProfilePage: PropTypes.bool,
};

export default MainSection;
