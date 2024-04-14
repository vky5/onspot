import Latest from "../components/Latest";
// import triangle from "../assets/backgroundimg.png";

function Home() {
  const backgroundStyle = {
    backgroundImage: `url({t})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };


  return (
    <div
      className="flex flex-col justify-center items-center"
      style={backgroundStyle}
    >
      <div>
        <h1 className="text-3xl text-white text-center mb-7 mt-5">ONSPOT</h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow space-y-3">
        <Latest />
        <Latest />
        <Latest />
      </div>
    </div>
  );
}

export default Home;
