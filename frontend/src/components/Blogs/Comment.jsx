
import profile from "../../assets/profile.png";

function Comment({ username, pfp, text }) {
  return (
    <div className="flex items-start p-3 border-b border-gray-200">
      <img
        src={pfp || profile}
        alt="Profile"
        className="h-8 w-8 rounded-full mr-3"
      />
      <div>
        <div className="flex items-center mb-1">
          <span className="text-sm font-semibold">good day young lady</span>
        </div>
        <div className="text-sm text-gray-700">this is my comment</div>
      </div>
    </div>
  );
}

export default Comment;
