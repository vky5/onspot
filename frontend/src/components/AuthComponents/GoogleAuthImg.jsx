import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleImg from "../../assets/Google.png";
import PropTypes from "prop-types";

function GoogleAuthImg({ updatingUserInfo, trackUserInfo }) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        if (response && response.access_token) {
          // Use the access_token to make authenticated requests to Google APIs
          const userInfoRes = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            }
          );

          updatingUserInfo({
            email: userInfoRes.data.email,
            password: userInfoRes.data.id,
            img: userInfoRes.data.picture,
            name: userInfoRes.data.given_name +" " + userInfoRes.data.family_name,
            username: userInfoRes.data.given_name.toLowerCase() + userInfoRes.data.family_name.toLowerCase()
          });

          trackUserInfo(true);


        } else {
          console.error("No access_token found in response:", response);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return (
    <div className="mt-3 mb-6 flex justify-center items-center">
      <button
        onClick={() => googleLogin()}
        className="bg-white rounded-full p-2 mt-2"
      >
        <img src={googleImg} alt="Google" />
      </button>
    </div>
  );
}

GoogleAuthImg.propTypes = {
  updatingUserInfo: PropTypes.func.isRequired,
  trackUserInfo: PropTypes.func.isRequired,
};

export default GoogleAuthImg;
