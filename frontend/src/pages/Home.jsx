import Latest from "../components/Latest";
// import triangle from "../assets/backgroundimg.png";

function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center"
    >
      <div>
        <h1 className="text-3xl text-center mb-7 mt-5">Blacktree</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center flex-grow space-x-3 space-y-3 ml-6 mr-6 bg-red-500">
        <Latest />
        <Latest />
        <Latest />
      </div>
    </div>
  );
}

export default Home;
