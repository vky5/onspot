// import paperPlaneImage from "../assets/paperplane.png"; // Assuming you have an image file named paperplane.png in your assets folder

function Latest() {
  return (
    <div className=" text-white bg-white rounded-3xl bg-opacity-20 drop-shadow-sm w-11/12">
      <div className="w-full text-white pr-2">
        <div className="flex">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-bl-3xl rounded-tl-3xl"
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
              alt="Paper Plane Image"
            />
          </div>
          <div className="ml-3">
            <div className="text-sm">
              This is the title of the plane and we are going flee
            </div>
            <div className="space-x-6">
              <span className="text-xs">12 April 2024</span>
              <span className="text-xs">By VKY</span>
            </div>
            <div className="space-x-2">
              <span>❤️</span>
              <span>10</span>
            </div>
            <div className="tags-container max-w-full flex flex-wrap space-y-1 space-x-1 text-xs">
              <span className="bg-green-700 p-1 rounded-xl shadow-md">
                quantum computing
              </span>
              <span className="bg-green-700 p-1 rounded-xl shadow-md">
                Cybersecurity
              </span>
              <span className="bg-green-700 p-1 rounded-xl shadow-md">
                Web Security
              </span>
              <span className="bg-green-700 p-1 rounded-xl shadow-md">
                edge computing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Latest;
